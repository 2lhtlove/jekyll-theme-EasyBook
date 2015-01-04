/*!
 * EasyBook Jekyll Theme Javascript
 * http://laobubu.net
 * https://github.com/laobubu/laobubu.github.io/tree/template
 *
 * This is just a extension for my theme.
 */

function TOC(toc,content) {
    var b = $('body');
    var cnt = 0;
    
    var generateLink = function(h) {
        var q = $('<a></a>');
        var hash = 'generated-hash-' + (cnt++);
        q.text(h.text());
        q.attr('href', '#' + hash );
        q.click(function(e){ b.animate({scrollTop: (h.offset().top) + 'px'},200);e.preventDefault()});
        return q;
    };
    
    var hs = content.children('h1, h2, h3, h4, h5, h6');
    var cul = null, plevel = 1;
    var uls = [$('<ul></ul>')];
    for (var i=0;i<hs.length;i++) {
        var level = +hs[i].tagName.substr(1);
        var hi = $(hs[i]);
        var ti = $('<li></li>');
        ti.append(generateLink(hi));
        if (plevel < level) {
            do {
                uls.push($('<ul></ul>'));
                uls[uls.length-2].append(uls[uls.length-1]);
            } while (++plevel < level);
        } else if (plevel > level) {
            do {
                cul = uls.pop();
            } while (--plevel > level);
        }
        cul = uls[uls.length-1];
        cul.append(ti);
    }
    while(true) {
        var chs = uls[0].children();
        if (chs.length == 1 && chs[0].tagName == 'UL')
            uls.shift();
        else
            break;
    }
    
    if (!cnt) return false;
    
    var scrolldummy=$('<div></div>');
    toc.append(scrolldummy);
    toc.append(uls[0]);
    toc.css({display:'block'});
    
    var win = $(window);
    var ppc = $('.post-content');
    var s1 = function(){
        var a=scrolldummy.offset().top,b1=b.scrollTop(),d={},c;
        if((c=b1-a+10)<0) c=0;
        if (c) {
            b1 = (win.height()-20);
            var vq = ppc.offset().top+ppc.height()-a-uls[0].height();
            if (c>vq) c=vq;
            d.maxHeight = b1 + 'px';
        } else {
            d.maxHeight = "auto";
        }
        scrolldummy.height(c+'px');
        uls[0].css(d);
    };
    win.scroll(s1);
    win.resize(s1);
}

$(function(){
    var toc=$('.post-toc');
    toc && (new TOC(toc, $('.post-content')));
});