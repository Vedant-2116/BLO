import random
import os
import nltk
import re
import sys
from pymongo import MongoClient
from bson import ObjectId
from fuzzywuzzy import fuzz

# Connect to MongoDB
client = MongoClient("mongodb+srv://vedqntgohel:r9KC6muUvCXjNIeJ@vedant.zonvp7s.mongodb.net/BLO", connect=False)
db = client["BLO"]

# Define responses for different intents
responses = {
    "greeting": ["Hello! I'm BLO, your personal assistant. How can I help you today?",
                 "Hi there! I'm BLO, at your service. What can I assist you with?",
                 "Hey, I'm BLO, here to help! What do you need assistance with?"],
    "goodbye": ["Goodbye!", "See you later!", "Bye!"],
    "thanks": ["You're welcome!", "No problem!", "Happy to help!"],
    "default": ["I'm sorry, I didn't understand that.", "Could you please rephrase that?", "I'm not sure I follow."]
}

# Function to verify user by email or username and get user ID
def verify_user(identifier):
    users_collection = db["users"]
    # Search for user by email or username
    user_data = users_collection.find_one({"$or": [{"email": identifier}, {"username": identifier}]})
    if user_data:
        return user_data["_id"]
    else:
        # If user not found, try to verify by both email and username separately
        if re.match(r"[^@]+@[^@]+\.[^@]+", identifier):
            # If provided identifier is an email, try to verify by email
            user_data = users_collection.find_one({"email": identifier})
        else:
            # If provided identifier is not an email, try to verify by username
            user_data = users_collection.find_one({"username": identifier})

        if user_data:
            return user_data["_id"]
        else:
            return None


# Function to generate a response based on user input
def generate_response(user_input):
    # Tokenize user input
    tokens = nltk.word_tokenize(user_input.lower())

    if any(word in tokens for word in ["hello", "hi", "hey"]):
        return random.choice(responses["greeting"])

    # Check if the user input is related to products
    if any(word in tokens for word in ["product", "products", "item", "items"]):
        return "BLO: Which product are you interested in? "

    # Check if the user input matches any product name
    products_collection = db["products"]
    product_cursor = products_collection.find({})
    product_names = [product["name"].lower() for product in product_cursor]
    user_input_lower = user_input.lower()
    matching_products = []
    for product_name in product_names:
        # Use fuzzy matching to find similarity between user input and product name
        similarity_score = fuzz.partial_ratio(user_input_lower, product_name)
        if similarity_score >= 80:  # Adjust the threshold as needed
            matching_products.append(product_name)

    if matching_products:
        return f" Found matching products: {', '.join(matching_products)}"
    else:
        # Check if the user input is related to orders
        if any(word in tokens for word in ["order", "orders"]):
            # Extract order ID from user input
            order_id_match = re.search(r'\b[0-9a-f]{24}\b', user_input)
            if order_id_match:
                order_id = order_id_match.group(0)
                # Retrieve order details from MongoDB using the provided order ID
                orders_collection = db["orders"]
                order_data = orders_collection.find_one({"_id": ObjectId(order_id)})
                if order_data:
                    return f" Here are the details of your order:\n{order_data}"
                else:
                    return " Order details not found."
            else:
                return " Please provide a valid order ID."

        # Check if the user input is related to users
        if any(word in tokens for word in ["user", "users", "profile", "account"]):
            return " What information would you like to know about your user profile? (e.g., shipping address, email)"

        # Check if the user input is related to shipping address
        if any(word in tokens for word in ["shipping", "address", "ship"]):
            jwt_token = get_jwt_token()
            user_id = get_user_id_from_token(jwt_token)
            user_data = get_user_data(user_id)
            if user_data and "shippingDetails" in user_data:
                shipping_details = user_data["shippingDetails"]
                address = ", ".join([shipping_details.get("streetAddress", ""),
                                     shipping_details.get("city", ""),
                                     shipping_details.get("province", ""),
                                     shipping_details.get("postalCode", "")])
                return f" Your shipping address is: {address}"
            else:
                return " Your shipping address is not available."

    return random.choice(responses["default"])


# Function to retrieve user data from MongoDB using user ID
def get_user_data(user_id):
    users_collection = db["users"]
    # Search for user by user ID
    user_data = users_collection.find_one({"_id": ObjectId(user_id)})
    return user_data

# Function to store user input and responses for self-learning
def store_conversation(user_input, response):
    conversations_collection = db["conversations"]
    conversation = {"user_input": user_input, "response": response}
    conversations_collection.insert_one(conversation)

# Function to update responses based on past conversations
def learn_from_past_conversations():
    conversations_collection = db["conversations"]
    # Group conversations by user input and aggregate responses
    pipeline = [
        {"$group": {"_id": "$user_input", "responses": {"$push": "$response"}}}
    ]
    # Iterate through grouped conversations
    for doc in conversations_collection.aggregate(pipeline):
        # Update responses for each user input
        user_input = doc["_id"]
        responses[user_input] = doc["responses"]

if __name__ == "__main__":
    # Learn from past conversations
    learn_from_past_conversations()
    # Read user input from stdin
    user_input = input().strip()
    # Generate response
    response = generate_response(user_input)
    # Store conversation for self-learning
    store_conversation(user_input, response)
    # Print response to stdout
    print(response)
    # Flush stdout to ensure response is sent immediately
    sys.stdout.flush()
