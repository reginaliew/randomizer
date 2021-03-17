$(document).ready(function(){
    var numOfInput = 0;
    var choices = new Array();
    var removed = new Array();
    var removedId = new Array();
    var color = ["is-error", "is-warning", "is-success", "is-dark", "is-primary"];
    
    $(document).on("click", "span.choices", function(event){
        var choiceId = this.id;
        removedId.push(choiceId);
        removed.push(choices[choiceId]);
        $("#"+choiceId).remove();
    });

    $("#add").on("click", function(){
        var tempVal = $("input[name=choice]").val();
        if (tempVal.length == 0) {
            document.getElementById('dialog-empty-input').showModal();
        } else {
            var similar = 0;
            for(var i=0;i<choices.length;i++){
                if(tempVal===choices[i]) {
                    similar++;
                }
            }
            if (similar<=0) {
                choices.push(tempVal);
                $("input[name=choice]").val("");
                var newChoice = '<span class="nes-badge choices" id="'+numOfInput+'"><span class="'+color[Math.floor(Math.random()*color.length)]+'">'+tempVal+'</span></span>';
                $(newChoice).appendTo(".block");
                numOfInput++;
            } else {
                document.getElementById('dialog-same-input').showModal();
            }
        }
    });

    var interval = null;
    $("#start").on("click", function(){
        if(choices.length>1){
            document.getElementById('dialog-show-result').showModal();
            $("#result").css("opacity", "1");
            interval = setInterval(randomize, 50);
            setTimeout(function(){
                clearInterval(interval);
                $('<span style="padding-bottom: 10px;"><i class="nes-icon trophy is-large"></i></span>').insertBefore('.randomize span');
            }, 4000)
        }else{
            document.getElementById('dialog-start-fail').showModal();
        }
    });

    function randomize() {
        var tempArr = new Array();
        tempArr = choices.filter(function(val) {
            return removed.indexOf(val) == -1;
        });
        console.log(tempArr);
        var rand = 0;
        rand = Math.floor(Math.random()*tempArr.length);
        $(".randomize").empty();
        $('<span>'+tempArr[rand]+'</span>').appendTo(".randomize");
        console.log(rand);
    }
    // var numOfInput = 1;
    // var newEle = '';
    // $("#add").on("click", function(){
    //     var empInput = 0;
    //     for(var i=0;i<numOfInput;i++) {
    //         var tempVal = $("input[name=choice0"+numOfInput+"]").val();
    //         if(tempVal.length == 0) {
    //             empInput++;
    //         }
    //     }
    //     var temp = 'choice0'+numOfInput;
    //     if (empInput<=0) {
    //         numOfInput++;
    //         newEle = '<div class="row choice0'+numOfInput+'">'+
    //                     '<div class="col">'+
    //                         '<div class="nes-field">'+
    //                             '<input type="text" name="choice0'+numOfInput+'" class="nes-input is-dark input-val">'+
    //                         '</div>'+
    //                     '</div>'+
    //                 '</div>';
    //         $(newEle).insertAfter($('.input .'+temp).last());
    //     } else if (empInput>0) {
    //         document.getElementById('dialog-empty-input').showModal();
    //     }
    // });
});
