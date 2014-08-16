# Navigation1
$(document).ready ->
  menu = $("#navigation-menu")
  menuToggle = $("#js-mobile-menu")
  signUp = $(".sign-up")
  $(menuToggle).on "click", (e) ->
    e.preventDefault()
    menu.slideToggle ->
      menu.removeAttr "style"  if menu.is(":hidden")
      return

    return


  # underline under the active nav item
  $(".nav .nav-link").click ->
    $(".nav .nav-link").each ->
      $(this).removeClass "active-nav-item"
      return

    $(this).addClass "active-nav-item"
    $(".nav .more").removeClass "active-nav-item"
    return

  return
