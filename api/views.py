from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required 
from django.db.models import Q
from django.http import JsonResponse
from public.models import Product, Order
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
import random
# Create your views here.

@require_POST
def validateUser(request):
    data = {
            "errors"    : [],
            "submit"    : True,
            "username"  : None,
            "email"     : None
        }
    new_username  = request.POST.get('username', '').strip().lower()
    new_email     = request.POST.get('email', '').strip().lower()
    new_password  = request.POST.get('password1', '')
    new_password2 = request.POST.get('password2', '')

    # Validations
    if not new_username:
        data['errors'].append('Username is required')
    elif User.objects.filter(username=new_username).exists():
        data['errors'].append('Username already taken')

    aro = False
    dot = False
    for char in new_email:
        if char == "@":
            aro =True
        if char == ".":
            dot = True
     
    if not new_email:
        data['errors'].append('Email is required')
    elif not aro or not dot:
        data['errors'].append('Invalid email')     
    elif User.objects.filter(email=new_email).exists():
        data['errors'].append('Email already taken')

    if not new_password:
        data['errors'].append('Password is required')
    elif len(new_password) < 8:
        data['errors'].append('Password must be at least 8 characters')
    elif new_password != new_password2:
        data['errors'].append('Passwords do not match')

    if data['errors']:
        data['submit'] = False
        
    data['username'] = new_username
    data['email'] = new_email
    
    return JsonResponse(data)   


@require_POST
def sentOTP(request):
    email = request.POST.get('email')
    otp_code = f'{random.randint(1000, 9999)}'
    request.session["otp_code"] = otp_code

    subject = 'Your Verification Code - BORDERLAND'
    text_content = f'Your OTP code is: {otp_code}. Valid for 10 minutes.'
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
            <tr>
                <td align="center">
                    <div style="max-width:480px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                        
                        <!-- Header -->
                        <div style="background:linear-gradient(135deg,#1e40af,#2563eb);padding:36px 40px;text-align:center;">
                            <p style="color:#fff;font-size:1.5rem;font-weight:700;margin:0;letter-spacing:-0.5px;">◆ BORDERLAND</p>
                            <p style="color:rgba(255,255,255,0.75);font-size:0.8rem;margin:6px 0 0;letter-spacing:2px;text-transform:uppercase;">Email Verification</p>
                        </div>

                        <!-- Body -->
                        <div style="padding:40px;">
                            <p style="color:#0f172a;font-size:1rem;margin:0 0 8px;">Hello 👋</p>
                            <p style="color:#475569;font-size:0.9rem;line-height:1.7;margin:0 0 28px;">
                               Use the code below to verify your identity. This code expires once you <strong>close the registration page</strong>.
                            </p>

                            <!-- OTP Box -->
                            <div style="background:#f8fafc;border:2px dashed #2563eb;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
                                <p style="color:#94a3b8;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Your OTP Code</p>
                                <p style="color:#2563eb;font-size:2.5rem;font-weight:700;letter-spacing:10px;margin:0;font-family:monospace;">{otp_code}</p>
                            </div>

                            <p style="color:#94a3b8;font-size:0.8rem;line-height:1.6;margin:0;">
                                If you did not request this code, please ignore this email. Do not share this code with anyone.
                            </p>
                        </div>

                        <!-- Footer -->
                        <div style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                            <p style="color:#94a3b8;font-size:0.75rem;margin:0;">© 2026 BORDERLAND. This is an automated message, please do not reply.</p>
                        </div>

                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    msg = EmailMultiAlternatives(subject, text_content, 'noreply.borderland.shop@gmail.com', [email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

    return JsonResponse({"success": True})

  
  
    
@require_GET
def validateOTP(request):
    data={
        'submit' : False
    }
    session_otp = request.session['otp_code']
    user_otp = request.GET.get('oc')
    if session_otp == user_otp:
        data['submit'] = True
        request.session["verified"] = True 
    #Server validation
     
    return JsonResponse(data)


@login_required
@require_POST
def validatePro(request):
    data = {
            "submit" : True,
            "errors" : [],
            "log"    : False
        }

    name = request.POST.get('name').strip()
    if name == "" or len(name) < 3:
        data['errors'].append('Provide a valid name !')
    elif len(name) > 200:
        data['errors'].append('Name must not excced 200 characters !')

    try :
        price = float(request.POST.get('price'))
    except:
        price = 0
    if price == 0 or price < 10:
        data['errors'].append('Provid a valid price !')
    elif len(f"{price:.2f}") > 10:
        data['errors'].append('Price number must not exceed 10 digits !')
        
    try:
        taxes = float(request.POST.get('taxes')) 
    except:
        taxes = 0
    if taxes < 0:
        data['errors'].append('Taxes must be a positif number !')
    elif len(f"{taxes:.2f}") > 10:
        data['errors'].append('Taxes number must not exceed 10 digits !')
        
    try:
        ads = float(request.POST.get('ads'))
    except:
        ads = 0
    if ads < 0:
        data['errors'].append('Ads must be a positif number !')
    elif len(f"{ads:.2f}") > 10:
        data['errors'].append('Ads number must not exceed 10 digits !')
        
    try:
        quantity = int(request.POST.get('quantity'))
    except:
        quantity = 0
    if quantity < 0:
        data['errors'].append('Quantity must be a positif number !')
    elif len(str(quantity)) > 10:
        data['errors'].append('Quantity number must not exceed 10 digits !')    
        
    try:
        sells = int(request.POST.get('sells'))
    except:
        sells = 0
    if sells < 0:
        data['errors'].append('Sells must be a positif number !')
    elif len(str(sells)) > 10:
        data['errors'].append('Sells number must not exceed 10 digits !')
        
    category = request.POST.get('category').strip()
    if category == "" or len(category) < 2:
        data['errors'].append('Provide a valid category !')
    elif len(category) > 200:
        data['errors'].append('Category must not exceed 200 characters !')

    description = request.POST.get('description').strip()
    if len(description) > 200:
        data['errors'].append('Description must not exceed 200 characters !')
    elif len(description) < 10:
        description = "N/A"   
        
    if data['errors'] != []:
        data['submit'] = False
    else:
        product = {
            'name':name,
            'price':price,
            'taxes':taxes,
            'ads':ads,
            'quantity':quantity,
            'sells':sells,
            'category':category,
            'description':description
        }
        data.update({'product':product})
    
    return JsonResponse(data)

@login_required
@require_GET   
def searchProducts(request):
    manager = Product.objects
    try:
        query = request.GET.get('search','').strip().lower()
        products =manager.filter(Q(name__icontains=query) 
                                |Q(category__icontains=query)).values('id',  'name', 'price', 'taxes', 'ads', 'quantity', 'sells', 'category')
        return JsonResponse({'productsFounded':list(products)})
    except AttributeError:
        return JsonResponse({'error':'Request failed !'})


@login_required
@require_GET
def deleteProduct(request):
    if not request.user.is_staff:
        return JsonResponse({'error':'Access Denied !'})
    data ={
        "deleted" : False,
    }
    if request.GET.get('idel') and request.GET.get('idel') != "all":
       del_id = request.GET.get('idel')
       product = get_object_or_404(Product, id=del_id)
       product.delete()
       data['deleted'] = True
       
    elif request.GET.get('idel') == "all":
       Product.objects.all().delete()
       data['deleted'] = True

    return JsonResponse(data)


#Orders:

@login_required
@require_POST
def validateOrder(request):
    data = {
            "submit" : True,
            "errors" : [],
            "log"    : False
        }
    #Validated Data
    customer = request.user
    product_id = request.POST.get('product_id')
    #Phone checking : 
    phone = request.POST.get('phone').strip().replace(" ", "").replace("+", "").replace("-", "")
    try:
        int(phone)
        if len(phone) != 10 :
            data['errors'].append('Phone number must contain exactly 10 digits (numbers only).') 
    except ValueError:
        data['errors'].append('Phone number must contain exactly 10 digits (numbers only).')
    
    #Address Checking:
    address = request.POST.get('address')
    if address == "" or len(address) < 10:
        data['errors'].append('Provide a valid address !')
    elif len(address) > 300:
        data['errors'].append('Address must not exceed 200 characters !')
    
    #Quantity Checking:
    try:
        quantity = int(request.POST.get('quantity'))
        if quantity <= 0:
            data['errors'].append('Quantity must be greater than or equal to 1.')
        elif quantity > Product.objects.get(id=product_id).quantity:
            data['errors'].append('Quantity requested not available.')
    except ValueError:
        data['errors'].append('Quantity  must be a number not text.')
    
    #Price Checking:
    try:
        price = float(request.POST.get('price')) * quantity
    except ValueError:
        data['errors'].append('Price Must be a decimal number.')
    
    #Notes Checking:
    notes = request.POST.get('notes')
    if len(notes) > 200:
        data['errors'].append('Notes must not exceed 200 characters !')
    elif len(notes) < 1:
        notes = "N/A"
        
        
    if data['errors'] != []:
        data['submit'] = False
    else:
        order = {
            'phone':phone,
            'address':address,
            'product':product_id,
            'quantity':quantity,
            'price':price,
            'notes':notes,
        }
        data.update({'order':order})
    return JsonResponse(data)



@login_required
@require_GET
def searchOrder(request):
    query = request.GET.get('search','').strip()
    
    foundedOr = Order.objects.filter(sku__icontains=query)
    if not foundedOr:
        foundedOr = Order.objects.filter(customer__username__icontains=query)
        if not foundedOr:
            foundedOr = Order.objects.filter(product__name__icontains=query)
    return JsonResponse({'foundedOrders':list(foundedOr)})


@login_required
@require_GET
def deleteOrder(request):
    if not request.user.is_staff:
        return JsonResponse({'error':'Access Denied !'})
    data ={
        "deleted" : False,
    }
    if request.GET.get('idel'):
       del_id = request.GET.get('idel')
       order = get_object_or_404(Order, id=del_id)
       order.delete()
       data['deleted'] = True

    return JsonResponse(data)

@login_required
@require_GET
def updateStatus(request):
    if not request.user.is_staff:
        return JsonResponse({'error':'Access Denied !'})
     
    data ={
        "updated" : False,
    }
    up_id = request.GET.get('idup')
    up_status = request.GET.get('statutup')
    if up_id and up_status:
       order = Order.objects.filter(id=up_id) 
       order.update(status=up_status)
       data['updated'] = True
    return JsonResponse(data)

