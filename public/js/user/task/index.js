$(document).ready(function () {
    var otp_value = "";
    var autoCall = null;
    var id_task = "";
    $(".cancopy").css("cursor", "pointer");
    $("#space").click(function (event) {
        let idClicked = event.target.id;
        let value = $("#" + idClicked).attr("data-value");
        if (value !== undefined) {
            navigator.clipboard.writeText(value);
            toastr.success("Đã sao chép", "Thông báo");
        }
    });
    getQuantity();

    $("#code_freeship").on("change", function (event) {
        getQuantity();
    });

    function getQuantity() {
        let type = $("#code_freeship").find("option:selected").val();
        $.ajax({
            url: "/api/task?type=" + type,
            type: "GET",
            success: function (response) {
                let html = "Số lượng nhiệm vụ có thể làm: " + response.quantity;
                $("#quantity").html(html);
            },
        });
    }

    $(".btn-getOTP").on("click", function (event) {
        let rs = confirm("Bạn có muốn lấy OTP?");
        if (rs) {
            id_task = $(this).attr("data-value");
            if (autoCall != null) {
                clearInterval(autoCall);
            }
            // get number phone sheet Numberphone
            // display phone get otp
            $.ajax({
                url: "/user/task/display/" + id_task,
                type: "GET",
                success: function (response) {
                    if (response.status == 0) {
                        $('#txt_phone_otp' + id_task).text(response.number_phone);
                        autoCall = setInterval(function () {
                            getOTP(id_task, response.number_phone);
                        }, 10000);
                    }
                    if (response.status == 1) {
                        toastr.error(response.message, "Thông báo");
                    }
                },
            });
        }
    });

    function getOTP(id, number_phone) {
        if (otp_value != "") {
            clearInterval(autoCall);
            console.log("call update OTP");
            updateOTP(id, otp_value, number_phone);
            return;
        }
        $.ajax({
            url: "/api/getOTP",
            data: { id, number_phone },
            type: "POST",
            success: function (response) {
                if (response.status == 0) {
                    otp_value = response.otp;
                    console.log(otp_value);
                }
            },
        });
    }

    function updateOTP(id, otp, number_phone) {
        $.ajax({
            url: "/api/updateOTP",
            data: { id, otp, number_phone },
            type: "POST",
            success: function (response) {
                if (response.status == 0) {
                    $('#txt_otp' + id).text(otp);
                    toastr.success("Đã lấy OTP thành công", "Thông báo");
                    // location.reload();
                }
                if (response.status == 1) {
                    toastr.error(response.message, "Thông báo");
                }
            },
        });
    }

    $('.btn-open-modal').on('click', function () {
        let id_task = $(this).attr('data-value');
        let type_account = $(this).attr('data-type');
        $('#form').attr('action', '/user/task/complete/' + id_task);
        if (type_account == 1) {
            $('.authen').html('');
            $('.authen').append(`
            <label><b>Tài khoản</b></label>
            <input type="text" class="form-control" placeholder="Nhập tài khoản..." name="username"
            required />
            <label><b>Mật khẩu</b></label>
            <input type="password" class="form-control" placeholder="Nhập mật khẩu..." name="password" required />
            `);
        }
        $('#id01').css('display', 'block');
    });
});
