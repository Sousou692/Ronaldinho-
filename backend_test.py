#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Ronaldinho Website
Tests all endpoints with success and error scenarios
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BASE_URL}/api"

print(f"🔗 Testing Ronaldinho API at: {API_BASE}")
print("=" * 60)

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(endpoint, status, message=""):
    """Log test results"""
    if status == "PASS":
        print(f"✅ {endpoint}: {message}")
        test_results["passed"] += 1
    else:
        print(f"❌ {endpoint}: {message}")
        test_results["failed"] += 1
        test_results["errors"].append(f"{endpoint}: {message}")

def test_endpoint(method, endpoint, expected_status=200, data=None, description=""):
    """Generic endpoint tester"""
    url = f"{API_BASE}{endpoint}"
    try:
        if method.upper() == "GET":
            response = requests.get(url, timeout=10)
        elif method.upper() == "POST":
            response = requests.post(url, json=data, timeout=10)
        else:
            log_test(endpoint, "FAIL", f"Unsupported method: {method}")
            return None
            
        if response.status_code == expected_status:
            try:
                json_data = response.json()
                log_test(endpoint, "PASS", f"{description} - Status: {response.status_code}")
                return json_data
            except json.JSONDecodeError:
                log_test(endpoint, "FAIL", f"Invalid JSON response - Status: {response.status_code}")
                return None
        else:
            log_test(endpoint, "FAIL", f"Expected {expected_status}, got {response.status_code}")
            return None
            
    except requests.exceptions.RequestException as e:
        log_test(endpoint, "FAIL", f"Request failed: {str(e)}")
        return None

# Test 1: Health Check
print("\n🏥 Testing Health Check...")
health_data = test_endpoint("GET", "/", 200, description="Health check endpoint")
if health_data:
    if "message" in health_data and "status" in health_data:
        print(f"   Message: {health_data.get('message')}")
        print(f"   Status: {health_data.get('status')}")
    else:
        log_test("/", "FAIL", "Missing required fields in health check response")

# Test 2: Hero Section
print("\n🦸 Testing Hero Section...")
hero_data = test_endpoint("GET", "/hero", 200, description="Hero section data")
if hero_data:
    required_fields = ["title", "subtitle", "description", "image", "stats"]
    missing_fields = [field for field in required_fields if field not in hero_data]
    if missing_fields:
        log_test("/hero", "FAIL", f"Missing fields: {missing_fields}")
    else:
        stats = hero_data.get("stats", {})
        stats_fields = ["trophees", "matchs", "buts", "ballonOr"]
        missing_stats = [field for field in stats_fields if field not in stats]
        if missing_stats:
            log_test("/hero", "FAIL", f"Missing stats fields: {missing_stats}")
        else:
            print(f"   Title: {hero_data.get('title')}")
            print(f"   Stats: {stats.get('trophees')} trophées, {stats.get('matchs')} matchs, {stats.get('buts')} buts")

# Test 3: Training Routines
print("\n🏃 Testing Training Routines...")
trainings_data = test_endpoint("GET", "/trainings", 200, description="Training routines list")
if trainings_data and isinstance(trainings_data, list):
    if len(trainings_data) > 0:
        training = trainings_data[0]
        required_fields = ["nom", "duree", "description", "exercices", "image", "ordre"]
        missing_fields = [field for field in required_fields if field not in training]
        if missing_fields:
            log_test("/trainings", "FAIL", f"Missing fields in training: {missing_fields}")
        else:
            print(f"   Found {len(trainings_data)} training routines")
            print(f"   First training: {training.get('nom')} ({training.get('duree')})")
    else:
        log_test("/trainings", "FAIL", "No training data found")

# Test 4: Training Videos
print("\n📹 Testing Training Videos...")
videos_data = test_endpoint("GET", "/training-videos", 200, description="Training videos list")
if videos_data and isinstance(videos_data, list):
    if len(videos_data) > 0:
        video = videos_data[0]
        required_fields = ["titre", "description", "url", "miniature", "duree", "category"]
        missing_fields = [field for field in required_fields if field not in video]
        if missing_fields:
            log_test("/training-videos", "FAIL", f"Missing fields in video: {missing_fields}")
        else:
            print(f"   Found {len(videos_data)} training videos")
            print(f"   First video: {video.get('titre')} ({video.get('category')})")
    else:
        log_test("/training-videos", "FAIL", "No video data found")

# Test 5: About Section
print("\n📖 Testing About Section...")
about_data = test_endpoint("GET", "/about", 200, description="About section data")
if about_data:
    required_fields = ["quote", "biographie", "carriere", "qualites", "momentsMarquants"]
    missing_fields = [field for field in required_fields if field not in about_data]
    if missing_fields:
        log_test("/about", "FAIL", f"Missing fields: {missing_fields}")
    else:
        print(f"   Biography length: {len(about_data.get('biographie', ''))} chars")
        print(f"   Career steps: {len(about_data.get('carriere', []))}")
        print(f"   Qualities: {len(about_data.get('qualites', []))}")

# Test 6: Statistics
print("\n📊 Testing Statistics...")
stats_data = test_endpoint("GET", "/statistics", 200, description="Statistics data")
if stats_data:
    required_fields = ["records", "clubs", "titres"]
    missing_fields = [field for field in required_fields if field not in stats_data]
    if missing_fields:
        log_test("/statistics", "FAIL", f"Missing fields: {missing_fields}")
    else:
        records = stats_data.get("records", {})
        print(f"   Records: {records.get('matchs')} matchs, {records.get('buts')} buts")
        print(f"   Clubs: {len(stats_data.get('clubs', []))}")
        print(f"   Titles: {len(stats_data.get('titres', []))}")

# Test 7: Social Links
print("\n🔗 Testing Social Links...")
social_data = test_endpoint("GET", "/social-links", 200, description="Social media links")
if social_data and isinstance(social_data, list):
    if len(social_data) > 0:
        link = social_data[0]
        required_fields = ["nom", "url", "icon", "ordre"]
        missing_fields = [field for field in required_fields if field not in link]
        if missing_fields:
            log_test("/social-links", "FAIL", f"Missing fields in social link: {missing_fields}")
        else:
            print(f"   Found {len(social_data)} social links")
            for social in social_data[:3]:  # Show first 3
                print(f"   - {social.get('nom')}: {social.get('url')}")
    else:
        log_test("/social-links", "FAIL", "No social links found")

# Test 8: Newsletter Subscription (Success)
print("\n📧 Testing Newsletter Subscription...")
test_email = f"test.ronaldinho.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
newsletter_data = test_endpoint("POST", "/newsletter", 200, 
                               data={"email": test_email}, 
                               description="Newsletter subscription")
if newsletter_data:
    if "message" in newsletter_data and "email" in newsletter_data:
        print(f"   Subscribed: {newsletter_data.get('email')}")
    else:
        log_test("/newsletter", "FAIL", "Missing fields in newsletter response")

# Test 9: Newsletter Subscription (Duplicate Email)
print("\n📧 Testing Newsletter Duplicate Email...")
duplicate_response = test_endpoint("POST", "/newsletter", 400, 
                                 data={"email": test_email}, 
                                 description="Duplicate email rejection")

# Test 10: Newsletter Subscription (Invalid Email)
print("\n📧 Testing Newsletter Invalid Email...")
invalid_response = test_endpoint("POST", "/newsletter", 422, 
                                data={"email": "invalid-email"}, 
                                description="Invalid email rejection")

# Test 11: Newsletter Count
print("\n📊 Testing Newsletter Count...")
count_data = test_endpoint("GET", "/newsletter/count", 200, description="Newsletter subscribers count")
if count_data:
    if "count" in count_data:
        print(f"   Subscribers count: {count_data.get('count')}")
    else:
        log_test("/newsletter/count", "FAIL", "Missing count field")

# Test 12: Testimonials (Get Approved)
print("\n💬 Testing Testimonials...")
testimonials_data = test_endpoint("GET", "/testimonials", 200, description="Approved testimonials")
if testimonials_data and isinstance(testimonials_data, list):
    print(f"   Found {len(testimonials_data)} approved testimonials")
    if len(testimonials_data) > 0:
        testimonial = testimonials_data[0]
        required_fields = ["nom", "message", "pays", "date", "approved"]
        missing_fields = [field for field in required_fields if field not in testimonial]
        if missing_fields:
            log_test("/testimonials", "FAIL", f"Missing fields in testimonial: {missing_fields}")
        else:
            print(f"   First testimonial by: {testimonial.get('nom')} from {testimonial.get('pays')}")

# Test 13: Create Testimonial
print("\n💬 Testing Create Testimonial...")
testimonial_data = {
    "nom": "João Silva",
    "message": "Ronaldinho é uma lenda do futebol brasileiro! Inspiração para todos nós.",
    "pays": "Brasil"
}
create_testimonial = test_endpoint("POST", "/testimonials", 200, 
                                 data=testimonial_data, 
                                 description="Create new testimonial")
if create_testimonial:
    if "message" in create_testimonial and "id" in create_testimonial:
        print(f"   Created testimonial ID: {create_testimonial.get('id')}")
    else:
        log_test("/testimonials POST", "FAIL", "Missing fields in create testimonial response")

# Test 14: Create Testimonial (Missing Fields)
print("\n💬 Testing Create Testimonial with Missing Fields...")
incomplete_testimonial = {"nom": "Test User"}
incomplete_response = test_endpoint("POST", "/testimonials", 422, 
                                  data=incomplete_testimonial, 
                                  description="Incomplete testimonial rejection")

# Test 15: Non-existent Endpoint (404 Test)
print("\n🚫 Testing Non-existent Endpoint...")
not_found = test_endpoint("GET", "/non-existent", 404, description="404 error handling")

print("\n" + "=" * 60)
print("🏁 TEST SUMMARY")
print("=" * 60)
print(f"✅ Passed: {test_results['passed']}")
print(f"❌ Failed: {test_results['failed']}")
print(f"📊 Total: {test_results['passed'] + test_results['failed']}")

if test_results['failed'] > 0:
    print(f"\n🔍 FAILED TESTS:")
    for error in test_results['errors']:
        print(f"   - {error}")

success_rate = (test_results['passed'] / (test_results['passed'] + test_results['failed'])) * 100
print(f"\n🎯 Success Rate: {success_rate:.1f}%")

if success_rate >= 90:
    print("🎉 EXCELLENT! Backend is working very well!")
elif success_rate >= 75:
    print("👍 GOOD! Most endpoints are working correctly.")
elif success_rate >= 50:
    print("⚠️  MODERATE! Several issues need attention.")
else:
    print("🚨 CRITICAL! Major issues detected in backend.")

print("\n" + "=" * 60)