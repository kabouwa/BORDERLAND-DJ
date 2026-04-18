from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.core.exceptions import PermissionDenied
from django.db.models import Q
from .models import Product, Order
import api.views as api
import json
# Create your views here.


#404
def page_not_found(request,exception):
    return render(request,'404.html', status=404)

def signupUser(request):
    if request.method == "POST":
        validation = api.validateUser(request)
        data = json.loads(validation.content)

        if data['submit'] and request.session["verified"]:
            
            user = User.objects.create_user(username=data['username'], email=data['email'], password=request.POST.get('password1').strip())
            login(request, user)
            return redirect('catalog')
        else:
          return render(request, 'signup.html', data)  
        
    return render(request, 'signup.html')


def loginUser(request):
    if request.method == "POST" :
        username = request.POST.get('username')
        password =  request.POST.get('password')
        user = authenticate(request, username=username, password=password) #check password in db users

        if user:
            login(request,user)
            url = request.GET.get('next')
            if user.is_staff :
                return redirect('admin') 
            elif url:
                return redirect(url)
            else:
                return redirect('catalog')       
        else:
            return render(request,'login.html',{"error": "Invalid credentials"})

    return render(request,'login.html')

def logout_user(request):
    logout(request)
    return redirect("home")


#Admin Panels

@login_required
def admin(request):
    if not request.user.is_staff:
        return redirect('home') 
    return render(request,'admin/admin.html')


@login_required
def manageProducts(request):
    if not request.user.is_staff:
        return redirect('home') 
    
    products = Product.objects
    data = {
        'products' : products.all(),
        'count'    : products.count(),
        'created'  : None,
        'updated'  : None,
        'deleted'  : None,
        }
    if request.GET.get('statut') == 'create':
        data['created'] = request.GET.get('product')
    elif request.GET.get('statut') == 'update':
        data['updated'] = request.GET.get('product')
    elif request.GET.get('statut') == 'delete':
        data['deleted'] = True
        
    return render(request,'admin/products.html',data)
    
@login_required   
def createProduct(request):
    if not request.user.is_staff:
        return redirect('home') 
    
    if request.method == "GET":
        return render(request,'admin/create.html')
    
    #Validation
    if request.method == "POST":
        validation = api.validatePro(request)
        data = json.loads(validation.content)
        if data["submit"]:
            product_data = data['product']
            new_product = Product.objects.create(
                name = product_data['name'],
                price = product_data['price'],
                taxes = product_data['taxes'],
                ads = product_data['ads'],
                quantity = product_data['quantity'],
                sells = product_data['sells'],
                category = product_data['category'],
                description = product_data['description'],
                image = request.FILES.get('image')
            )
            return redirect(f'/kabouwa/products/?statut=create&id={new_product.id}&product={new_product.name}')
        else:
           return render(request,'admin/create.html',{'errors':data["errors"]}) 
       
@login_required 
def updateProduct(request,id):
    if not request.user.is_staff:
        return redirect('home') 
    
    if request.method == "POST":
        validation = api.validatePro(request)
        data = json.loads(validation.content)
        if data["submit"]:
            product_data = data['product']
            Product.objects.filter(id=id).update(
                name = product_data['name'],
                price = product_data['price'],
                taxes = product_data['taxes'],
                ads = product_data['ads'],
                quantity = product_data['quantity'],
                sells = product_data['sells'],
                category = product_data['category'],
                description = product_data['description']
            )
            up_product = Product.objects.get(id=id)
            return redirect(f'/kabouwa/products/?statut=update&id={id}&product={up_product.name}') 
    try:
        up_product = Product.objects.get(id=id)
        return render(request,'admin/update.html',{'p':up_product})
    except:
        return HttpResponse('Access Blocked product id not founded in db to update !')
    
@login_required 
def manageOrders(request):
    if not request.user.is_staff:
        return redirect('home') 
    manager = Order.objects
    try:
        query = request.GET.get('search').strip()
    except AttributeError:
        query = None
    if query:
        orders = Order.objects.filter(Q(sku__icontains=query)  
                                |Q(customer__username__icontains=query) 
                                |Q(product__name__icontains=query)       
                                |Q(product__name__icontains=query)
                                |Q(phone__icontains=query)
                                |Q(created_at__icontains=query))
    else:
        orders = manager.all().order_by('-created_at')
    
    #Total Revenue
    total_revenue = 0
    for order in manager.all():
        total_revenue += order.price      
         
    data = {
        'orders': orders,
        'pending_count' : manager.filter(status='pending').count(),
        'delivered_count' : manager.filter(status='delivered').count(),
        'total_revenue' : total_revenue,
        'query' :query,
    }    
    if request.GET.get('statut') == 'deleted':
        data.update({'deleted':True})    
    return render(request,'admin/all-orders.html',data)
    
    
    
#Public pages:
def home(request):
    if request.user.is_staff:
        return redirect('admin')
    
    return render(request,'home.html')


@login_required
def catalog(request):

    products = Product.objects
    data = {
        'products' : products.all(),
        'count' : products.count(),
    }
    for p in products.all():
        print( p.image )
        
    return render(request,'catalog.html',data)

@login_required
def createOrder(request):
    if request.user.is_staff:
        raise PermissionDenied
    
    if request.method == "GET":
        product_id = request.GET.get("product_id")
        if product_id:
            product = Product.objects.get(id=product_id)
            return render(request,'order.html',{'product':product})
        else:
            return HttpResponse('Access Blocked !')
    
    if request.method == "POST":
        validation = api.validateOrder(request)
        data = json.loads(validation.content)
        
        if data['submit']:
            order = data['order']
            Order.objects.create(
                customer = request.user,
                phone = order['phone'],
                address = order['address'],
                product = Product.objects.get(id=order['product']) ,
                quantity = order['quantity'],
                price = order['price'],
                notes = order['notes']
            )
            return redirect('customer_orders')
        
          
@login_required     
def customerOrder(request):
    if request.user.is_staff:
        raise PermissionDenied
    orders = Order.objects.filter(customer=request.user).order_by('-created_at')
    return render(request,'orders.html',{'orders':orders})