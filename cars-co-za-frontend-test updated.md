# Cars.co.za Front-End Development Test

## Introduction

Welcome to the Cars.co.za Senior Front-End Development Test! This assessment is designed to evaluate your skills in creating a high-fidelity, functional web application that demonstrates your expertise in modern web development technologies.

As a key member of our development team, you'll be expected to:

- Translate design mockups into pixel-perfect, responsive web interfaces
- Implement complex functionality with clean, maintainable code
- Handle real-world scenarios such as varied data configurations and user interactions
- Demonstrate problem-solving skills and attention to detail

This test will challenge you to recreate our vehicle view page, showcasing your ability to work with APIs, manage state, and create an intuitive user experience that meets the high standards of Cars.co.za.

## Objective

Recreate the Cars.co.za vehicle view page with high fidelity in terms of design and functionality using:

- NextJs (Pages Router)
- Additional tools of your choice

## Reference Listing

Here is an image of what you are trying to recreate
[2008 Volkswagen Touran 1.9 TDI Trendline - Mpumalanga Middelburg](https://img-ik.cars.co.za/devtest/Listing_iwZDhHcKT.png?updatedAt=1733984167988)

Examples of functionality can be found on Cars.co.za

## API Endpoints

Available API endpoints can be found at:
[https://nextjs-rho-red-22.vercel.app/](https://nextjs-rho-red-22.vercel.app/)

The vehicle id you will be using is `7927016`

## Key Requirements

- Implement a responsive design that closely matches the original Cars.co.za vehicle view page
- Protect mobile numbers by obscuring them until clicked
- Handle scenarios where dealers may not have WhatsApp enabled

## Technical Considerations

- Use NextJs as the primary framework
- Implement responsive design
- Secure handling of contact information
- Graceful handling of varied dealer configurations
- The navigation bar does not need to contain all the navigation items. It will just need the Cars.co.za logo
- You do not need to implement the View Map functionality
- You do not need to implement the report car functionality
- Please note how image urls are structured using the images on the Cars.co.za platform. The vehicle id is used for the look up while the title is for SEO.
  - main image: https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/[vehicle_id]/[title].jpg?v=[version]
  - thumbnail image: https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_thumb/[vehicle_id]/[title].jpg?v=[version]
  - large image: https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-news_1200x/[vehicle_id]/[title].jpg?v=[version]

## Submission Guidelines

1. Ensure all functionality is implemented
2. Provide clear documentation on how to run the project
3. Include any necessary instructions or notes
4. Commit frequently
5. Share a link to a repo entitled dev-test-{your name}

**Good luck with the test!**
