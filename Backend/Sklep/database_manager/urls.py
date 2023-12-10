from django.urls import path, include
from . import views

urlpatterns = [
    path('add_test', views.add_test),
    path('viewAllCategory', views.viewAllCategory),
    path('viewAllCustomers', views.viewAllCustomers),
    path('viewAllOrders', views.viewAllOrders),
    path('viewCart', views.viewCart),
    path('viewAllProductsFromCategory', views.viewAllProductsFromCategory),
    path('register/', views.register),
    path('login/', views.login),

    path('register_superuser/', views.reigster_superuser),
    path('addCategory', views.addCategory),
    path('addProduct_Meta',views.addProduct_Meta),
    path('addProduct', views.addProduct),
    path('viewAllDiscs', views.viewAllDiscs),
    path('viewAllProcessors', views.viewAllProcessors),
    path('viewAllGraphicCards', views.viewAllGraphicCards),
    path('addCategory', views.addCategory),
    path('addProduct_Meta',views.addProduct_Meta),
    path('addProduct', views.addProduct),
    path('addProductItem', views.addProductItem),

    path('addCustomer',views.addCustomer),
    path('addToCart', views.addToCart),
    path('makeOrder', views.makeOrder),
    path("deleteProduct", views.deleteProduct),
    path("deleteCart", views.deleteCart),
    path("deleteCartItem", views.deleteCartItem),

    ]
