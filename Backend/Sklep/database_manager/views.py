from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import HttpResponse, JsonResponse, HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, logout

# Create your views here.



def register(request):
    if request.method == 'GET':
        user = Customer.objects.create_user("test","test@Test.pl","testtesttest")
        user.save()
        
def login(request):
    if request.method == 'GET':
        user = authenticate(name="test", password="testtesttest")
        if user is not None:
            print("LETSGO")
            if request.user.is_authenticated:
                print("TAK")
                logout(request)
                if request.user.is_authenticated:
                    print("ciagle tak")
                else:
                    print("juz nie")
        else:
            print(":()")
        
    

# takie tam testy
def add_test(request):
    if request.method == 'GET':
        name="Procesory"
        new_category = Category(category_name=name)
        new_category.save()
        name="Dyski"
        new_category = Category(category_name=name)
        new_category.save()
        name="Karty Graficzne"
        new_category = Category(category_name=name)
        new_category.save()

        name = "Tomek"
        email = "tomek@gmail.com"
        password = "1234"
        new_customer = Customer(name=name,email=email,password=password)
        new_customer.save()

        name = "Maciek"
        email = "maciek@gmail.com"
        password = "abcd"
        new_customer = Customer(name=name,email=email,password=password)
        new_customer.save()
        name = "Arek"
        email = "arek@gmail.com"
        password = "qwerty"
        new_customer = Customer(name=name,email=email,password=password)
        new_customer.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


# funkcje od widoków
def viewAllCategory(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        category_names = [
            {
                'id': category.id,
                'category_name': category.category_name,
            }
            for category in categories
        ]
        return JsonResponse(category_names, safe=False)
    else:
        return HttpResponse(status=400)

def viewAllCustomers(request): #dla admina
    if request.method == 'GET':
        customers = Customer.objects.all()
        customers_data = [
            {
                'id': customer.id,
                'name': customer.name,
                'email': customer.email,
            }
            for customer in customers
        ]
        return JsonResponse(customers_data, safe=False)
    else:
        return HttpResponse(status=400)

@api_view(['GET'])
def viewAllOrders(request): # przykładowe zapytanie http://127.0.0.1:8000/viewAllOrders?customer=4
    if request.method == 'GET':
        customer_value = request.GET.get('customer')
        if customer_value is not None:
            orders = Order.objects.filter(customer=customer_value)
            serializer=OrderSerializer(orders, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)


def viewCart(request): # No takie nie wiem nawet czy to działa, ale niech będzie na razie
    if request.method == 'GET':
        customer_value = request.GET.get('customer')
        if customer_value is not None:
            cart = Cart.objects.get(customer=customer_value)
            cart_items = Cart_Item.objects.filter(cart=cart.id)
            cart_data = [
                {
                    'amount': item.amount,
                    'product_name': Product.objects.get(id=item.product).product,
                    'price': Product.objects.get(id=item.product).price,
                }
                for item in cart_items
            ]
            return JsonResponse(cart_data, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)



def viewAllProductsFromCategory(request): #to trzeba całkowicie przerobić, dodać warunki w zależności od kategorii lub to w serializatorze obrobić czy coś
    if request.method == 'GET':
        category_id = request.GET.get('category_id')
        if category_id is not None:
            products = Product.objects.filter(category=category_id)
            products_data = [
                {
                    'id': product.id,
                    'price': product.price,
                }
                for product in products
            ]
            return JsonResponse(products_data, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)
