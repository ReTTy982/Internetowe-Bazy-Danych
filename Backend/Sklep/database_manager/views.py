from django.shortcuts import render
from .models import *
from .serializers import *

# Create your views here.


# funkcje od widoków
def viewAllCategory(request):
    response = "categories"
    return response
def viewAllCustomers(request): #dla admina
    response = "customers"
    return response
def viewAllOrders(request):
    response = "UserOrders"
    return response
def viewCart(request):
    # JSON(Nazwa, Cena, Ilość)
    response = "cart_items"
    return response
def viewAllProductsFromCategory(request):
    response = "products by category_id"
    return response
