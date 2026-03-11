from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('kabouwa/home/'                   , admin          , name='admin'),
    path('kabouwa/products/'               , manageProducts   , name='products'),
    path('kabouwa/create-product/'         , createProduct  , name='create'),
    path('kabouwa/update-product/<int:id>/', updateProduct  , name='update'),
    path('kabouwa/orders/'                 , manageOrders   , name='orders'),
    
    #Public : 
    path('customer/signup/'                , signupUser     , name='signup'),
    path('customer/login/'                 , loginUser      , name='login'),
    path('customer/logout/'                , logout_user    , name='logout'),
    
    path(''                                , home           , name='home'),
    path('customer/catalog/'               , catalog        , name='catalog'),
    path('customer/create-order/'          , createOrder    , name='create_order'),
    path('customer/orders/'                , customerOrder  , name='customer_orders'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)