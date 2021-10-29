window.Product = (function() {

  const selectors = {
    swiperContainer: '[data-swiper-container]',
    swiperSlide: '[data-swiper-slide]',
    productJson: '[data-product-json]',
    idSelector: '[data-product-id]',
    variantOption: '[data-variant-option]',
    productPrice: '[data-product-price]',
    quantitySelector: '[data-quantity-selector]',
    quantitySpinner: '[data-qty-spinner]',
  };

  function Product($container) {
    this.productJson = JSON.parse($container.querySelector(selectors.productJson).innerHTML);
    this.$variantOptions = $container.querySelectorAll(selectors.variantOption);
    this.$idSelector = $container.querySelector(selectors.idSelector);
    this.$productPrice = $container.querySelector(selectors.productPrice);
    this.$quantitySelector = $container.querySelector(selectors.quantitySelector);
    this.$quantitySpinners = $container.querySelectorAll(selectors.quantitySpinner);

    this.$variantOptions.forEach(variantOption => {
      variantOption.addEventListener('change', this.onOptionChange.bind(this));
    });

    this.$quantitySpinners.forEach(spinner => {
      spinner.addEventListener('click', this.onSpinnerClick.bind(this));
    })

    this.InitGallery();
  }

  Product.prototype = {
    InitGallery() {
      this.swiper = new Swiper(selectors.swiperContainer, {
        lazy: {
          loadPrevNext:true,
          loadPrevNextAmount: 3,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        }
      })
    },
    onOptionChange(evt) {
      const $this = evt.currentTarget;
      const selectedVariant = this.productJson.variants.filter((variant) => {
        if(variant.title == $this.value) return variant;
      })
      if(selectedVariant.length) {
        this.updateVariant(selectedVariant[0]);
      }
    },
    updateVariant(variant) {
      this._updateIdSelector(variant);
      this._updatePrice(variant);
    },
    _updateIdSelector(variant) {
      this.$idSelector.value = variant.id;
    },
    _updatePrice(variant) {
      const price = `\$ ${variant.price/100}`;
      this.$productPrice.text = price;
    },
    onSpinnerClick(evt) {
      const $this = evt.currentTarget;
      let currentQty = this.$quantitySelector.value;

      if($this.dataset.qtySpinner == "increase") {
        currentQty++;
      } else {
        currentQty--;
      }

      if(currentQty == 0) {
        currentQty = 1;
      }

      this.$quantitySelector.value = currentQty;
    }
  }

  return Product;
})();

window.Cart = (function() {
  selectors = {
    productForm: "form[target='/cart']",
    addToCartButton: "[data-add-to-cart]"
  }

  function Cart() {
    this.$form = document.querySelectorAll(selectors.productForm);

    this.$form.forEach((form) => {
      form.addEventListener('submit', this.onFormSubmit.bind(this));
    })
  }

  Cart.prototype = {
    onFormSubmit(evt) {
      evt.preventDefault();
      let $form = evt.currentTarget;
      let $formButton = $form.querySelector(selectors.addToCartButton);
      const formData = new FormData(evt.currentTarget);
      const originalButtonText = $formButton.innerText;
      $formButton.innerText = 'Adding...';

      axios.post('/cart/add.js', {
        'id': formData.get('id'),
        'quantity': formData.get('quantity')
      }).then(() => {
        $formButton.innerText = 'Added!'
        setTimeout(() => {
          $formButton.innerText = originalButtonText;
        }, 3000);
      })
    }
  }

  return Cart;
})();

new Product(document.querySelector('[data-product]'));
new Cart();