
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
    <title>Robber Run</title>
    <style type="text/css">
        body {
            background-color: #4e3e31;
            margin-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            background-image:url(/games/robberrun/bg3.jpg);
            background-position: center top;
            background-repeat:no-repeat;
        }
        #content{
            /*margin-top: 30px;
            margin-bottom: 20px;*/
        }
        .container{
            max-width: 100%!important;
            height: 100%;
        }
        #game {
            color: #000;
            margin: auto;
            width: 100%;
        }

         header{
            position: relative;
        }
    </style>
</head>

<body>
    <div id="content" class="container">
        <div id="game">
            <iframe frameborder="0" src="<?php echo url($path) ?>/game/index.html" ></iframe>
        </div>
    </div>
    <script src="<?php echo url($path) ?>/game/jquery-2.1.1.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
                var heightRecalculated = (jQuery(window).height() - $('.ctnLogo').height());
                var heightRecalculated = (heightRecalculated - 6) + "px";

                var widthRecalculated = jQuery(window).width();

                function resize() {
                    $('#c2canvas').css({"display": "none"});
                    $('#container').css({"height": '100%', "width": '100%'});
                    $('#game iframe').css({"width" : "100%", "height": heightRecalculated});
                }

                setTimeout(function() { resize(); }, 201);
        });
    </script>
</body>
</html>