$(document).ready(function() {

var messageForText = $('#messageForText');
var messageForFile = $('#messageForFile');

    $('#form').submit(function(e) {
      if(($('#fileName')[0].files).length == 0 && $('#text').val() == '') {
        alert('Вы не заполнили ни одно из полей!')
        return false
      }
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: 'template.php',
        data: new FormData(this),
        cache: false,
        dataType: 'json',
        contentType: false,
        processData: false,
        beforeSend: function(){
          $('input').prop('disabled', true);
        },
        success: function(data){
          if(data.statusText == true) {
            messageForText.text('Запись успешно добавлена!');
            $('#text').val('');
        } else{
          if(!($('#text').val(''))){
            messageForText.text('Ошибка при записи текста!');
          }
        }
        if(data.statusFile == true) {
            messageForFile.text('Файл успешно загружен!');
            $('#fileName').val('');
        } else{
          if(!($('#fileName').val(''))){
            messageForFile.text("Ошибка при загрузке файла!");
          }
        }
        },
        complete: function(){
          $('input').prop('disabled', false);
        },
      });
    });

});
