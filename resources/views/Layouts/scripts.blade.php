<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!--   Core JS Files   -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
    integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="{{ asset('static/js/core/popper.min.js') }}"></script>
<script src="{{ asset('static/js/core/bootstrap.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/chart.js/chart.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/jquery.sparkline/jquery.sparkline.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/chart-circle/circles.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/bootstrap-notify/bootstrap-notify.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/jqvmap/jquery.vmap.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/jqvmap/maps/jquery.vmap.world.js') }}"></script>
<script src="{{ asset('static/js/plugin/sweetalert/sweetalert.min.js') }}"></script>
<script src="{{ asset('static/js/atlantis.min.js') }}"></script>
<script src="{{ asset('static/js/setting-demo.js') }}"></script>
<script src="{{ asset('static/js/setting-demo2.js') }}"></script>
<script src="{{ asset('static/js/select2.full.min.js') }}"></script>
<script src="{{ asset('static/js/plugin/chart.js/chart.min.js') }}"></script>
<script src="{{ asset('static/helper/helper.js') }}"></script>

{{-- Jquery Validate --}}

<script src="{{ asset('static/jquery-validation/dist/jquery.validate.js') }}"></script>
<script src="{{ asset('static/jquery-validation/dist/jquery.validate.min.js') }}"></script>
<script src="{{ asset('static/jquery-validation/dist/additional-methods.js') }}"></script>
<script src="{{ asset('static/jquery-validation/dist/additional-methods.min.js') }}"></script>

{{-- Numeral --}}
<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

{{-- SweetAlert --}}
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

{{-- Data tables --}}
<script src="{{ asset('static/js/plugin/datatables/datatables.min.js') }}"></script>

{{-- Moment --}}
<script src="{{ asset('static/js/plugin/moment.js') }}"></script>

{{-- DateRangePicker --}}
<script src="{{ asset('static/js/plugin/dateRangePicker/dateRangePicker.js') }}"></script>

{{-- Font --}}
<script src="{{ asset('static/js/plugin/webfont/webfont.min.js') }}"></script>

{{-- summernote --}}
<script src="{{ asset('static/summernote/summernote-bs4.min.js') }}"></script>

{{-- crypto.js --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"
    integrity="sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

{{-- aes encrypt --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/aes.min.js"
    integrity="sha512-UOtWWEXoMk1WLeC873Gmrkb2/dZMwvN1ViM9C1mNvNmQSeXpEr8sRzXLmUSha1X4x5V892uFmEjiZzUsYiHYiw=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    var key = $('meta[name="key"]').attr('content');
</script>

{{-- cookie js --}}
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>


<script>
    WebFont.load({
        google: {
            "families": ["Lato:300,400,700,900"]
        },
        custom: {
            "families": ["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands",
                "simple-line-icons"
            ],
            urls: ["{{ asset('static/css/fonts.css') }}"]
        },
        active: function() {
            sessionStorage.fonts = true;
        }
    });
</script>

{{-- logout --}}
<script>
    const urlLogout = 'logout'
    $(document).ready(function() {
        $('#iconLogout').click(function(e) {
            Swal.fire({
                title: 'Yakin ingin Logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                resolveButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    e.preventDefault();
                    $.ajax({
                        url: `{{ url('${urlLogout}') }}`,
                        method: 'POST',
                        dataType: 'json',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function(response) {
                            console.log(response);
                            window.location.href = '{{ url("/login") }}';
                        },
                        error: function(xhr, status, error) {
                            console.log(error)
                            alert('Error: Failed to logout. Please try again.');
                        }
                    });
                }
            });
        });
    });
</script>