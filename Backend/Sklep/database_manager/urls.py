from django.urls import path, include
from . import views

urlpatterns = [
    path('viewAllCategory',views.viewAllCategory),
    path('viewAllCustomers',views.viewAllCustomers),
    path("viewAllOrders",views.viewAllOrders),
    path('viewCart', views.viewCart),
    path("viewAllProductsFromCategory",views.viewAllProductsFromCategory),
    ]
