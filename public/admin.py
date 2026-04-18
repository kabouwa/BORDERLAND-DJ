from django.contrib import admin
from .models import Product, Order

"""
username : admin
email : admin@mail.com
password : admin
"""

# Register your models here.
admin.site.register(Product)
admin.site.register(Order)