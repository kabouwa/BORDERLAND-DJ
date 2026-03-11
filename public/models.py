from django.db import models
from django.contrib.auth.models import User
import random
import string

# Generate order number :
def generate_order_number():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))





# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=200)
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    taxes = models.DecimalField(max_digits=10, decimal_places=2)
    ads = models.DecimalField(max_digits=10, decimal_places=2)
    
    quantity = models.IntegerField()
    sells = models.IntegerField()
    
    category = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    
    image = models.ImageField(upload_to='product/', blank=True, null=True)
    
    def __str__(self):
        return f'Product No{self.id} : {self.name}'
    
    @property
    def total(self):
        return round(self.price + self.taxes + self.ads, 2)
    
    
class Order(models.Model):
    sku  = models.CharField(max_length=6,default=generate_order_number)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    address  = models.CharField(max_length=300)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    STATUS = [
        ('pending',    'Pending'),
        ('confirmed',  'Confirmed'),
        ('shipped',    'Shipped'),
        ('delivered',  'Delivered'),
        ('cancelled',  'Cancelled'),
    ]
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    notes  = models.TextField(max_length=200,blank=True)
    
    def __str__(self):
        return f'Order #{self.id} - {self.customer} - {self.created_at}'
    
    def total_price(self):
        return self.product.total
    
    
