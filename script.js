var originalPositions = {};

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

function storeOriginalPositions() {
    $(".movableImg").each(function () {
        originalPositions[this.id] = { top: this.style.top, left: this.style.left };
    });
}

function resetPositions() {
    $(".movableImg").each(function () {
        var originalPosition = originalPositions[this.id];
        this.style.top = originalPosition.top;
        this.style.left = originalPosition.left;
    });
}

function takeScreenshot() {
    html2canvas(document.getElementById("mBody")).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        var a = document.createElement('a');
        a.href = imgData;
        a.download = 'FinalLook';
        a.click();
    });
}

function changeBackground() {
    var backgrounds = ['images/background1.png','images/background2.png', 'images/background3.png'];
    var currentBackground = 0;

    $("#backgroundButton").click(function () {
        currentBackground = (currentBackground + 1) % backgrounds.length;
        $("body").css('background-image', 'url(' + backgrounds[currentBackground] + ')');
    });
}


$(document).ready(function () {
    $(".movableImg").each(function () {
        dragElement(this);
    });

    storeOriginalPositions();

    $("#resetButton").click(function () {
        resetPositions();
    });

    $("#saveButton").click(function () {
        takeScreenshot();
    });

    changeBackground(); 
});