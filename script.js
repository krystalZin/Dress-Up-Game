//Problem 1
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function takeScreenshot() {
    html2canvas(document.getElementById("mBody")).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var a = document.createElement('a');
        a.href = imgData;
        a.download = 'mr_potato_head.png';
        a.click();
    });
}

$(document).ready(function() {
    $(".movableImg").each(function() {
        dragElement(this);
    });

    $("#saveButton").click(function() {
        takeScreenshot();
    });
});

//Problem 2
let fullscreen = false;
  $(document).ready(function(){
    $("#problem2").on( "mouseenter", function() { 
        if (!fullscreen) {
            $(this).animate({
                width: "100vw",
                height: "100vh"
            }, 5000, function () {
                $("#mBody").hide();
                $("#potatoTitle").hide();
                $("#saveButton").hide();
                $("#revert").show();
                fullscreen = true;
            })
        }     
    });

    $("#revert").on("click", function() {
        $("#problem2").width("400px").height("auto");
        $("#mBody").show();
        $("#potatoTitle").show();
        $("#saveButton").show();
        $("#revert").hide();
        fullscreen = false;
  } );
 });
 