// P1.
var p1_bicycle_path = 'assets/sprites/move1/Bicycle/1';
var p1_human2_path = 'assets/sprites/move1/Walk01/Walk01';
var p1_human3_path = 'assets/sprites/move1/Walk01/Walk01';
var p1_human4_path = 'assets/sprites/move1/Walk01/Walk01';
var p1_human5_path = 'assets/sprites/move1/Walk01/Walk01';
var p1_human6_path = 'assets/sprites/move1/Walk01/Walk01';
var p1_icon_path = 'assets/sprites/move1/Bubble_01_300px15fps/01_300px15fps';
//P2.
var p2_human1_path = 'assets/sprites/move1/Walk01/Walk01';
var p2_human2_path = 'assets/sprites/move1/Walk01/Walk01';
var p2_human3_path = 'assets/sprites/move1/Walk01/Walk01';
var p2_human4_path = 'assets/sprites/move1/Walk01/Walk01';
var p2_human5_path = 'assets/sprites/move1/Walk01/Walk01';
var p2_icon_path = 'assets/sprites/move1/Bubble_01_300px15fps/01_300px15fps';
// P3.
var p3_icon_path = 'assets/sprites/move1/Bubble_01_300px15fps/01_300px15fps';

// P1.
var p1_bicycle_frame_count = 70;
var p1_human2_frame_count = 70;
var p1_human3_frame_count = 70;
var p1_human4_frame_count = 70;
var p1_human5_frame_count = 70;
var p1_human6_frame_count = 70;
var p1_icon_frame_count = 46;
var p2_human1_frame_count = 70;
var p2_human2_frame_count = 70;
var p2_human3_frame_count = 70;
var p2_human4_frame_count = 70;
var p2_human5_frame_count = 70;
var p2_icon_frame_count = 46;
var p3_icon_frame_count = 46;

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

function drawSpriteSheet(sprite_path, sprite_frame_count, has_zero_path, sprite_row, sprite_column, sprite_width, sprite_height, sprite_source_width, sprite_source_height) {
    var canvas = document.getElementById("sprite_sheet");
    var context = canvas.getContext('2d');

    canvas.width = sprite_column * sprite_width;
    canvas.height = sprite_row * sprite_height;

    // context.fillStyle = "#00FF00";
    // context.fillRect(0, 0, canvas.width, canvas.height);

    var sprite_srcs = [];
    for (count = 0; count < sprite_frame_count; count++) {
        if (has_zero_path) {
            sprite_srcs[count] = sprite_path + zero_path(count) + count + '.png';
        }
        else {
            sprite_srcs[count] = sprite_path + '_' + count + '.png';
        }
        console.log(sprite_srcs[count]);
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
                    context.drawImage(imgs[count], 0, 0, sprite_source_width, sprite_source_height,
                        (column * sprite_width), (row * sprite_height), sprite_width, sprite_height);
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