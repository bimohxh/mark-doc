var ps = []

$(function(){
  $("#con").html(marked($('#tmpcon').html()))

  var el = $('.leftbar li.active.level-1')
  
  //生成左侧菜单
  $('.content h1').each(function(){
    var h1el = addSubMenu(el, $(this).text(), 2)
    $(this).nextUntil("h1", 'h2').each(function(){
      addSubMenu(h1el, $(this).text(), 3)
    })
  })

  
  $(".content h1, .content h2").each(function(){
    $(this).attr('id', $(this).text())
  })
  
  var isfirst = true
  $(document).scroll(function(){
    if (isfirst) {
      $(".content h1, .content h2").each(function(){
        ps.push({
          id: $(this).text(),
          top: $(this).offset().top
        })
      })
    }

    isfirst = false
    
    // 左侧菜单定位
    if ($(document).scrollTop() >= 120) {
      $('.leftbar').addClass('fixed')
    }else{
      $('.leftbar').removeClass('fixed')
    }

    // 菜单高亮监测
    var hilightID =  hilightMenu($(document).scrollTop()).id


    $(".leftbar li[data-action=" + hilightID + "]").addClass('active').siblings('li').removeClass('active')
    window.history.pushState(null, null, "#" + hilightID);

  })


  

  

})


function hilightMenu(scroll){
  var index = ps.length;
  
  for(var i = 0; i < ps.length; i++){
    if(ps[i].top - 10 >= scroll) {
      index =  i
      return ps[(index == 0 ? 0 : index - 1)] 
    }
  }

  return ps[(index == 0 ? 0 : index - 1)] 
}



//- 添加子菜单
var activeFirst = true;
var addSubMenu = function(current_li, text, level){
  var ul = current_li.find("ul").first()
  if(ul.length < 1){
    var ul = $("<ul></ul>")
    current_li.append(ul)
  }
  var li = $('<li class="level-' + level + '" data-action="' + text + '"><a href="#' + text + '">' + text + '</a></li>')
  if (activeFirst) {
    li.addClass('active')
  }
  activeFirst = false
  ul.append(li)
  return li
}
