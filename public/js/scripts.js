var $postcomment = null;
$(function () {
    $postcomment = $("#post-comment");
    $postcomment.hide();
    $("#btn_comment").click(function () {
        $postcomment.show();
    });
    $("#btn-like").click(function () {
        var imgId = $(this).data('id');
        $.post('/images/' + imgId + '/like')
        .done(function (data) { $('.likes-count').text(data.likes); });
    })
});