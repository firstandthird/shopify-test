# Set up process
## Thinking process
Javascript file was set up to follow the same logic that Shopfy Slate proves by creating Constructors for each module prsent on the page.

On this project it was set up for both the **Product form** section and the **Cart** section this to isolate each feature apropriatedly letting them control their own parts of the website.

----

## Product form logic
For the product section tried to include as much information present as possible so the module addresses the following situations:

### Variant change
Whenever the user selects a different option the script will iterate through the productJson object previously captured in order to find the ID that correspond with said option, once this is done the script will update the followign attached data

* Product Price
* Product Variant ID (hidden selector)

As part of this implementation more details can be updated for example the following:

* Product gallery (by picking any relevant product option and matching it with a section of the alt text of the images allowing us to toggle them on demand)
* Add to cart button status ( By checking the product availability the button can be either disabled, enabled, or exchanged by a Notify Me button to trigger a BIS flow)
* Variant specific data (By picking information from product custom fields other areas of the page can be changed)

### Quantity selector
This piece can be extracted into its own code so we can use the logic anywhere (such as product cards and/or cart page) turning the item into its own module but for the scope of this project it was set up within the product page.

----

## Cart logic

On the other hand the cart (and/or mini cart) is the piece joining all together, so instead of having mutliple scripts handlign submissions to the cart it will be only global event handling all of them.

Having the cart being its own module allows the possibility to handle multiple kind of forms consistently by just adding the product form base structure to any module that needs it (PLP cards, Cart Upsell cards, some other modules that need to submit products in special circumstances), or serving some of the methods as utilities that will ease different data submission, this also will handle any update made to the cart such as updating the cart count, updating the button add status or even opening the sidecart to create a visual response.

This kind of modularization also opens up space to integrate features like GWP and BOGO (they might require to use shopify scripts for pricing updates).

----

# What would I add to the test
* Basic HTML structure to compensate the lack of certain native methods such as the filter **| options_with_values** and allow for reviewing a responsive experience
* Data validation on the API endpoint to ease spotting data submission errors, and adding more chance for depper results
* Different variant data so it can be reflected on the product details (prices, discount prices, different variant availability) this will lead to have more chance of code improvement
