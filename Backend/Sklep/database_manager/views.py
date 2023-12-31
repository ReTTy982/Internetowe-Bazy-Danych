from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import HttpResponse, JsonResponse, HttpRequest
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404

from django.shortcuts import get_object_or_404
from django.utils import timezone

from django.contrib.auth import authenticate, logout, login
from django.db import IntegrityError, transaction
from django.contrib.sessions.models import Session
from rest_framework import status
from django.core.exceptions import FieldError
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from django.contrib import auth
# Create your views here.


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        try:
            print(request.data)
            if Customer.objects.filter(email=request.data["email"]).exists():
                raise IntegrityError
            CustomerSerializer.validate_password(value=request.data['password'])
            user = Customer.objects.create_user(request.data["name"],
                                                request.data["email"],
                                                request.data["password"])
            
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({"error": f"User with email {request.data['email']} already exists"}, status=status.HTTP_409_CONFLICT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def reigster_superuser(request):
    if request.user is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST' and request.user.is_superuser:
        try:
            if Customer.objects.filter(email=request.data["email"]).exists():
                raise IntegrityError
            CustomerSerializer.validate_password(value=request.data['password'])
            user = Customer.objects.create_superuser(request.data["name"],
                                                request.data["email"],
                                                request.data["password"])
            
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({"error": f"User with email {request.data['email']} already exists"}, status=status.HTTP_409_CONFLICT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])        
@csrf_exempt      
def login(request):
    if request.method == 'POST':
        user = authenticate(name=request.data['name'], password=request.data['password'])
        if user is not None:
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user_id=user.id)
            auth.login(request, user)
            return Response({"user_id": user.id, "success": True, "is_superuser" : user.is_superuser, "token" : token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)
        
 

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
                'is_staff': customer.is_staff
            }
            for customer in customers
        ]
        return JsonResponse(customers_data, safe=False)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
def viewAllOrders(request):
    if request.method == 'POST':
        #customer_value = request.GET.get('customer')
        customer_value = request.data.get('customer')
        if customer_value is not None:
            orders_database = Order.objects.filter(customer=customer_value)
            serializer=Order_ViewSerializer(orders_database, many=True)
            orders=serializer.data
            # doklejenie do listy zamówień elementów w nim zawartych,
            for order in orders:
                order_items=Order_Item.objects.filter(order=order["id"])
                serializer_item = Order_Item_ProductSerializer(order_items, many=True)
                order_items=serializer_item.data
                for order_item in order_items:
                    product = Product_Item.objects.get(serial_number=order_item["product_item"])
                    serializer_product=ProductItemSerializer(product)
                    product_name=serializer_product.data
                    name_nwm=product_name["product"]
                    name=Product.objects.get(id=name_nwm).product_name
                    order_item["product_name"]=name
                order["content"]=serializer_item.data
            return JsonResponse(orders, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
def viewCart(request): # No takie nie wiem nawet czy to działa, ale niech będzie na razie
    if request.method == 'POST':
        #customer_value = request.GET.get('customer')
        customer_value = request.data.get('customer')
        if customer_value is not None:
            cart = Cart.objects.get(customer=customer_value)
            cart_items = Cart_Item.objects.filter(cart=cart.id)
            serializer=Cart_Item_ProductSerializer(cart_items,many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)



def viewAllProductsFromCategory(request): # to jest niepotrzebne
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

@api_view(['GET'])
def viewAllDiscs(request):
    if request.method == 'GET':
        products = Product.objects.filter(category=Category.objects.get(category_name='Dyski').id)
        serializer=ProductWithProduct_MetaSerializer(products,many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponse(status=400)
@api_view(['GET'])
def viewAllProcessors(request):
    if request.method == 'GET':
        products = Product.objects.filter(category=Category.objects.get(category_name='Procesory').id)
        serializer=ProductWithProduct_MetaSerializer(products,many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponse(status=400)

@api_view(['GET'])
def viewAllGraphicCards(request):
    if request.method == 'GET':
        products = Product.objects.filter(category=Category.objects.get(category_name='Karty Graficzne').id)
        serializer=ProductWithProduct_MetaSerializer(products,many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
def addCategory(request):
    if request.method == 'POST':
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def addProduct_Meta(request):
    if request.method == 'POST':
        serializer=Product_MetaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def addProduct(request):
    if request.method == 'POST':
        try:
            params = request.data
            category_name = params['category_name']
            product_meta_data = params['product_meta']

            category, created_category = Category.objects.get_or_create(category_name=category_name)

            product_meta_serializer = Product_MetaSerializer(data=product_meta_data)
            if product_meta_serializer.is_valid():
                product_meta, created_meta = Product_Meta.objects.get_or_create(**product_meta_serializer.validated_data)
            else:
                return Response(product_meta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            product = Product(
                product_name=params['product_name'],
                amount=params['amount'],
                price=params['price'],
                producer=params['producer'],
                category=category,
                product_meta=product_meta
            )
            product.full_clean()
            product.save()

            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (ValueError, TypeError, FieldError, ObjectDoesNotExist, ValidationError) as e:
            return Response(status=400, data=repr(e))

@api_view(['POST'])
def addProductItem(request):
    if request.method == 'POST':
        try:
            params = request.data
            product = Product.objects.get(id=params['id'])
            productItem = Product_Item(
                product=product,
                serial_number=params['serial_number'],
                in_stock=True
            )
            productItem.full_clean()
            productItem.save()
            serializer = ProductItemSerializer(productItem)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (ValueError, TypeError, FieldError, ObjectDoesNotExist, ValidationError) as e:
            return Response(status=400, data=repr(e))

@api_view(['POST'])
def addCustomer(request):
    if request.method == 'POST':
        try:
            params = request.data
            customer = Customer(
                name=params['name'],
                email=params['email'],
                password=params['password']
            )
            customer.full_clean()
            customer.save()

            serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (ValueError, TypeError, FieldError, ObjectDoesNotExist, ValidationError) as e:
            return Response(status=400, data=repr(e))

@api_view(['POST'])
def addToCart(request):
    if request.method == 'POST':
        try:
            customer_id = request.data.get('customer_id')
            product_id = request.data.get('product_id')
            amount = request.data.get('amount')
            customer = get_object_or_404(Customer, id=customer_id)
            existing_cart = Cart.objects.filter(customer=customer).first()
            if existing_cart:
                cart = existing_cart
            else:
                cart = Cart.objects.create(customer=customer, order_date=timezone.now())
            product = get_object_or_404(Product, id=product_id)
            cart_item = Cart_Item.objects.create(cart=cart, product=product, amount=amount)

            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except (ValueError, TypeError, ObjectDoesNotExist) as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))

@api_view(['POST'])
def makeOrder(request):
    try:
        customer_id = request.data['customer_id']
        cart = Cart.objects.get(customer_id=customer_id)

        with transaction.atomic():
            order = Order.objects.create(
                customer=cart.customer,
                total_price=0,
                order_date=cart.order_date,
                city=request.data['city'],
                street=request.data['street'],
                house_number=request.data['house_number']
            )

            for cart_item in Cart_Item.objects.filter(cart=cart):
                product = cart_item.product
                amount = cart_item.amount

                product_items = Product_Item.objects.filter(product=product, in_stock=True)[:amount]

                for product_item in product_items:
                    product_item.in_stock = False
                    product_item.save()

                for product_item in product_items:
                    Order_Item.objects.create(
                        product_item=product_item,
                        order=order,
                        price=product.price
                    )


            orders=Order_Item.objects.filter(order_id = order.id)

            order.total_price = sum(order_item.price for order_item in orders)
            order.save()


            Cart_Item.objects.filter(cart=cart).delete()

            return Response({'message': 'Zamówienie zostało złożone.'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteProduct(request):
    try:
        product_id = request.data.get('product_id')
        product = Product.objects.get(pk=product_id)
    except (Product.DoesNotExist, ValueError):
        raise Http404("Product does not exist")

    Product_Item.objects.filter(product=product).delete()

    if product.product_meta:
        product.product_meta.delete()

    product.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def deleteCart(request):
    try:
        customer_id = request.data.get('customer_id')
        customer_cart = Cart.objects.get(customer_id=customer_id)
    except (Cart.DoesNotExist, ValueError):
        raise Http404("Cart does not exist for the specified customer")

    customer_cart.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def deleteCartItem(request):
    try:
        cart_item_id = request.data.get('id')
        cart_item = Cart_Item.objects.get(id=cart_item_id)
    except (Cart.DoesNotExist, ValueError):
        raise Http404("Cart does not exist for the specified customer")

    cart_item.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)