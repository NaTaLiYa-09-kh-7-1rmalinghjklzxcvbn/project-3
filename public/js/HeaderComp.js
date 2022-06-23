Vue.component('header-el', {

    template: `
   <div class="header Content">
            <div class="container">
                <div class="header_un">
                    <div class="header_l">
                        <div class="logo1"><a href="index.html"><img src="img/logo1-2.svg" alt="logo1"></a>
                        </div>
                            <filter-el></filter-el>
                    </div>
                    <div class="header_r">
                        <div class="icon ic-menu">

                            <a href="#"><i class="fa-solid fa-bars"></i> </a>
                        </div>
                        <div class="icon icn-1"><a href="product.html"><i class="fa-solid fa-user"></i></a>
                        </div>
                            <cart ref="cart"></cart>
                        </div>
                    </div>
                    </div>
            </div>
        `
});







