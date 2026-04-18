from django.urls import path
from .views import *

urlpatterns = [
    path('api/cleanData/'   ,validatePro     ),
    path('api/searchProducts/'  ,searchProducts     ),
    path('api/del-product/' ,deleteProduct  ),
    
    path('api/cleanUser/'   ,validateUser     ),
    path('api/sentOTP/'  ,sentOTP   ),
    path('api/validateOTP/'  ,validateOTP   ),
    
    path('api/cleanOrder/'  ,validateOrder   ),
    path('api/searchOrder/'  ,searchOrder   ),
    path('api/deleteOrder/'  ,deleteOrder   ),
    path('api/updateStatus/'  ,updateStatus   ),
    
]
