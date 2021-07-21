// P1.
// var p1_bicycle_path = 'assets/sprites/1/01_Bicycle/01_Bicycle';
// var p1_human2_path = 'assets/sprites/1/02_Human/02_Human';
// var p1_human3_path = 'assets/sprites/1/03_Human/03_Human';
// var p1_human4_path = 'assets/sprites/1/04_Human/04_Human';
// var p1_human5_path = 'assets/sprites/1/05_Human/05_Human';
// var p1_human6_path = 'assets/sprites/1/06_Human/06_Human';
// var p1_icon_path = 'assets/sprites/1/Part01_Icon/Part01_Icon';
// var p1_bicycle_path = 'assets/sprites/1/Bicycle_15fps/Bicycle_15fps';
// var p1_human2_path = 'assets/sprites/1/Human01_15fps/Human01_15fps';
// var p1_human3_path = 'assets/sprites/1/Human02_15fps/Human02_15fps';
var p1_bicycle_path = 'assets/sprites/4/Bicycle_15fps/Bicycle_15fps';
var p1_human2_path = 'assets/sprites/4/Human01/Human01_15fps';
var p1_human3_path = 'assets/sprites/4/Human02/Human02_15fps';
var p1_human4_path = 'assets/sprites/1/Human03_15fps/Human03_15fps';
var p1_human5_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
var p1_human6_path = 'assets/sprites/1/Human05_15fps/Human05_15fps';
var p1_icon_path = 'assets/sprites/1/Part01_Icon/Part01_Icon';
// Test.
// var p1_bicycle_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
// var p1_human2_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
// var p1_human3_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
// var p1_human4_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
// var p1_human5_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
// var p1_human6_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
// var p1_icon_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
//P2.
// var p2_human1_path = 'assets/sprites/2/Human01_v2/Human01_v2';
// var p2_human2_path = 'assets/sprites/2/Human02_v2/Human02_v2';
// var p2_human3_path = 'assets/sprites/2/Human03_v2/Human03_v2';
// var p2_human4_path = 'assets/sprites/2/Human04_v2/Human04_v2';
// var p2_human5_path = 'assets/sprites/2/Human05_v2/Human05_v2';
var p2_human1_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
var p2_human2_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
var p2_human3_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
var p2_human4_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
var p2_human5_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
var p2_icon_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';
// P3.
//var p3_icon_path = 'assets/sprites/3/PART03_Icon/PART03_Icon';
var p3_icon_path = 'assets/sprites/1/Human04_15fps/Human04_15fps';

// P1.
var p1_bicycle_frame_count = 67;
var p1_human2_frame_count = 151;
var p1_human3_frame_count = 169;
var p1_human4_frame_count = 163;
var p1_human5_frame_count = 179;
var p1_human6_frame_count = 138;
var p1_icon_frame_count = 77;
// var p2_human1_frame_count = 223;
// var p2_human2_frame_count = 251;
// var p2_human3_frame_count = 271;
// var p2_human4_frame_count = 298;
// var p2_human5_frame_count = 229;
// var p2_icon_frame_count = 77;
// var p3_icon_frame_count = 77;
// var p1_bicycle_frame_count = 179;
// var p1_human2_frame_count = 179;
// var p1_human3_frame_count = 179;
// var p1_human4_frame_count = 179;
// var p1_human5_frame_count = 179;
// var p1_human6_frame_count = 179;
// var p1_icon_frame_count = 179;
var p2_human1_frame_count = 179;
var p2_human2_frame_count = 179;
var p2_human3_frame_count = 179;
var p2_human4_frame_count = 179;
var p2_human5_frame_count = 179;
var p2_icon_frame_count = 179;
var p3_icon_frame_count = 179;

function zero_path(count) {
    if (count < 10) {
        return '_0000';
    }
    else if (count >= 10 && count < 100) {
        return '_000';
    }
    else {
        return '_00';
    }
}

function drawSpriteSheet(sprite_path, sprite_frame_count, has_zero_path, sprite_row, sprite_column, sprite_width, sprite_height) {
    var canvas = document.getElementById("sprite_sheet");
    var context = canvas.getContext('2d');

    canvas.width = sprite_column * sprite_width;
    canvas.height = sprite_row * sprite_height;

    var sprite_srcs = [];
    for (count = 0; count < sprite_frame_count; count++) {
        if (has_zero_path) {
            sprite_srcs[count] = sprite_path + zero_path(count) + count + '.png';
        }
        else {
            sprite_srcs[count] = sprite_path + '_' + count + '.png';
        }
    }

    function preloadImages(srcs) {
        function loadImage(src) {
            return new Promise(function (resolve, reject) {
                var img = new Image();
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = img.onabort = function () {
                    reject(src);
                };
                img.src = src;
            });
        }
        var promises = [];
        for (var i = 0; i < srcs.length; i++) {
            promises.push(loadImage(srcs[i]));
        }
        return Promise.all(promises);
    }

    preloadImages(sprite_srcs).then(function (imgs) {
        console.log(imgs);

        success = false;

        count = 0;
        for (row = 0; row < sprite_row; row++) {
            for (column = 0; column < sprite_column; column++) {
                if (imgs[count] != undefined) {
                    context.drawImage(imgs[count], (column * sprite_width), (row * sprite_height), sprite_width, sprite_height);
                }
                count++;
                if (count >= sprite_frame_count) {
                    success = true;
                    break;
                }
            }
            if (success) {
                break;
            }
        }

        //canvas.toDataURL('image/png', 1);
    }, function (errImg) {
        //
    });
}

function p1_bicycle_sprite_sheet() {
    var canvas = document.getElementById("sprite_sheet");
    var context = canvas.getContext('2d');

    var sprite_row = 14;
    var sprite_column = 14;

    var sprite_width = 600;
    var sprite_height = 600;

    canvas.width = sprite_column * sprite_width;
    canvas.height = sprite_row * sprite_height;

    var p1_bicycle_srcs = [];
    for (count = 0; count < p1_bicycle_frame_count; count++) {
        p1_bicycle_srcs[count] = p1_bicycle_path + zero_path(count) + count + '.png';
    }

    function preloadImages(srcs) {
        function loadImage(src) {
            return new Promise(function (resolve, reject) {
                var img = new Image();
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = img.onabort = function () {
                    reject(src);
                };
                img.src = src;
            });
        }
        var promises = [];
        for (var i = 0; i < srcs.length; i++) {
            promises.push(loadImage(srcs[i]));
        }
        return Promise.all(promises);
    }

    preloadImages(p1_bicycle_srcs).then(function (imgs) {
        console.log(imgs);

        success = false;

        count = 0;
        for (row = 0; row < sprite_row; row++) {
            for (column = 0; column < sprite_column; column++) {
                if (imgs[count] != undefined) {
                    context.drawImage(imgs[count], (column * sprite_width), (row * sprite_height), sprite_width, sprite_height);
                }
                count++;
                if (count >= p1_bicycle_frame_count) {
                    success = true;
                    break;
                }
            }
            console.log("xxx");
            if (success) {
                break;
            }
        }

        canvas.toDataURL('image/png', 1);
    }, function (errImg) {
        //
    });
}

function dlCanvas() {
    var canvas = document.getElementById("sprite_sheet");
    var dt = canvas.toDataURL('image/png');

    download(canvas, 'sprite_sheet.png');
};

function download(canvas, filename) {
    var lnk = document.createElement('a'), e;

    lnk.download = filename;

    lnk.href = canvas.toDataURL("image/png;base64");

    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}