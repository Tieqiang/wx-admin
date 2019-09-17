!(function(s) {
  var e,
    n =
      '<svg><symbol id="icon-Logout" viewBox="0 0 1024 1024"><path d="M468.2 466.9V108.7c0-24.7 20-44.8 44.8-44.8s44.8 20 44.8 44.8V467c0 24.7-20 44.8-44.8 44.8s-44.8-20.1-44.8-44.9z m253-351.7c-33.5-17.6-73.8 6-73.8 43.8 0 19.2 11.4 35.9 28.4 44.9C800.3 270 880.2 409.4 857.4 564.3 834.8 717.8 707 840.6 552.8 857.8 343 881.2 164.7 716.9 164.7 511.7c0-134.1 76.2-250.8 187.7-308.9 15.7-8.2 26.3-23.7 26.3-41.4v-4.1c0-37.1-39.5-60-72.4-42.8-157.8 82.3-260.5 255.8-238 450.6 23.6 203.8 189.5 369 393.4 391.6 270.3 30 499.2-180.7 499.2-445-0.1-172.2-97.2-321.6-239.7-396.5z"  ></path></symbol></svg>',
    t = (e = document.getElementsByTagName('script'))[e.length - 1].getAttribute('data-injectcss');
  if (t && !s.__iconfont__svg__cssinject__) {
    s.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) setTimeout(e, 0);
      else {
        var t = function() {
          document.removeEventListener('DOMContentLoaded', t, !1), e();
        };
        document.addEventListener('DOMContentLoaded', t, !1);
      }
    else
      document.attachEvent &&
        ((o = e),
        (i = s.document),
        (c = !1),
        (d = function() {
          try {
            i.documentElement.doScroll('left');
          } catch (e) {
            return void setTimeout(d, 50);
          }
          n();
        })(),
        (i.onreadystatechange = function() {
          'complete' == i.readyState && ((i.onreadystatechange = null), n());
        }));
    function n() {
      c || ((c = !0), o());
    }
    var o, i, c, d;
  })(function() {
    var e, t;
    ((e = document.createElement('div')).innerHTML = n),
      (n = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (function(e, t) {
          t.firstChild
            ? (function(e, t) {
                t.parentNode.insertBefore(e, t);
              })(e, t.firstChild)
            : t.appendChild(e);
        })(t, document.body));
  });
})(window);
