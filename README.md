Order and Payment App
------------

This app is to handle order. It provides three endpoints:
1. Create Order
2. Cancel Order
3. Check Order Status
4. Get All Order for User
5. Get All Products
6. Create Payment

---------------------------------------------------------

Create Order EndPoint:

	Method: POST
	EndPoint: http://localhost:3001/api/order/
	body: {
		"email": "don@gmail.com",
		"deliveryAddress": "Somewhere in kl",
		"items": [
		  {
		    "product": "Camera",
		    "quantity": "5",
		    "price": "290"
		  },
		  {
		    "product": "Phone",
		    "quantity": "10",
		    "price": "48"
		  }
		]
	}
	Response:{
	    "code": "0000",
	    "message": "",
	    "result": {
	        "email": "don@gmail.com",
	        "deliveryAddress": "Somewhere in kl",
	        "items": [
	            {
	                "product": "Camera",
	                "quantity": "5",
	                "price": "290"
	            },
	            {
	                "product": "Phone",
	                "quantity": "10",
	                "price": "48"
	            }
	        ],
	        "orderState": "created",
	        "totalAmount": 338,
	        "status": "active",
	        "_id": "5e07bd1316f9bd049cb3547c",
	        "createDate": "2019-12-28T20:37:39.534Z",
	        "modifiedDate": "2019-12-28T20:37:39.534Z"
	    }
	}

---------------------------------------------------------

Cancel Order EndPoint

	Method: PUT
	EndPoint: http://localhost:5000/order/<orderId>
	body: {
		"orderState": "cancelled"
	}
	Response:{
		"code": "0000",
	    "message": "",
	    "result": {
	        "email": "don@gmail.com",
	        "deliveryAddress": "Somewhere in kl",
	        "items": [
	            {
	                "product": "Camera",
	                "quantity": "5",
	                "price": "290"
	            },
	            {
	                "product": "Phone",
	                "quantity": "10",
	                "price": "48"
	            }
	        ],
	        "orderState": "cancelled",
	        "totalAmount": 338,
	        "status": "active",
	        "_id": "5e07ad4df4f65f03c06c979a",
	        "createDate": "2019-12-28T19:30:21.480Z",
	        "modifiedDate": "2019-12-28T19:30:21.637Z"
	    }
	}

---------------------------------------------------------

Get all Orders EndPoint

	Method: GET
	EndPoint: http://localhost:5000/order/all
	Response:{
		
	}


---------------------------------------------------------

Get all Products EndPoint

	Method: GET
	EndPoint: http://localhost:3001/api/product/all
	Response:{
	    "code": "0000",
	    "message": "",
	    "result": [
	        {
	            "title": "Camera",
	            "description": "Digital Camera",
	            "price": "200",
	            "available": true,
	            "status": "active",
	            "_id": "5e077fec977cd900d9f4b028",
	            "createDate": "2019-12-28T20:37:23.399Z",
	            "modifiedDate": "2019-12-28T20:37:23.399Z"
	        },
	        {
	            "title": "Phone",
	            "description": "Huwaei Phone",
	            "price": "100",
	            "available": true,
	            "status": "active",
	            "_id": "5e077fec977cd900d9f4b029",
	            "createDate": "2019-12-28T20:37:23.399Z",
	            "modifiedDate": "2019-12-28T20:37:23.399Z"
	        },
	        {
	            "title": "USB Cable",
	            "description": "USB Cable Connector ",
	            "price": "10",
	            "available": true,
	            "status": "active",
	            "_id": "5e077fec977cd900d9f4b02a",
	            "createDate": "2019-12-28T20:37:23.399Z",
	            "modifiedDate": "2019-12-28T20:37:23.399Z"
	        }
	    ]
	}


---------------------------------------------------------

Create Payment EndPoint

	Method: GET
	EndPoint: http://localhost:3002/api/payment/
	body: {
		"order": "5c98dc6c327fa63b77054268",
		"mode": "cash",
		"amount": 338
	}
	Response:{
		
	}


---------------------------------------------------------


