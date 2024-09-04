$(document).ready(() => {
  $().ready(() => {
    $('#fiverr').attr('href', 'https://www.fiverr.com/onfqzmpgvr/provide-my-cryptocurrency-trading-bot-1318');
    $('#telegram').attr('href', 'https://t.me/end_lesslove2012');

    $sidebar = $('.sidebar');
    $navbar = $('.navbar');
    $main_panel = $('.main-panel');

    $full_page = $('.full-page');

    $sidebar_responsive = $('body > .navbar-collapse');
    sidebar_mini_active = true;
    white_color = false;

    window_width = $(window).width();

    fixed_plugin_open = $(
      '.sidebar .sidebar-wrapper .nav li.active a p',
    ).html();

    $('.fixed-plugin a').click(function (event) {
      if ($(this).hasClass('switch-trigger')) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      }
    });

    $('.fixed-plugin .background-color span').click(function () {
      $(this)
        .siblings()
        .removeClass('active');
      $(this).addClass('active');

      const new_color = $(this).data('color');

      if ($sidebar.length > 0) {
        $sidebar.attr('data', new_color);
      }

      if ($main_panel.length > 0) {
        $main_panel.attr('data', new_color);
      }

      if ($full_page.length > 0) {
        $full_page.attr('filter-color', new_color);
      }

      if ($sidebar_responsive.length > 0) {
        $sidebar_responsive.attr('data', new_color);
      }
    });

    $('.switch-sidebar-mini input').on(
      'switchChange.bootstrapSwitch',
      function () {
        const $btn = $(this);

        if (sidebar_mini_active === true) {
          $('body').removeClass('sidebar-mini');
          sidebar_mini_active = false;
          blackDashboard.showSidebarMessage('Sidebar mini deactivated...');
        } else {
          $('body').addClass('sidebar-mini');
          sidebar_mini_active = true;
          blackDashboard.showSidebarMessage('Sidebar mini activated...');
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(() => {
          window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(() => {
          clearInterval(simulateWindowResize);
        }, 1000);
      },
    );

    $('.switch-change-color input').on(
      'switchChange.bootstrapSwitch',
      function () {
        const $btn = $(this);

        if (white_color === true) {
          $('body').addClass('change-background');
          setTimeout(() => {
            $('body').removeClass('change-background');
            $('body').removeClass('white-content');
          }, 900);
          white_color = false;
        } else {
          $('body').addClass('change-background');
          setTimeout(() => {
            $('body').removeClass('change-background');
            $('body').addClass('white-content');
          }, 900);

          white_color = true;
        }
      },
    );

    $('.light-badge').click(() => {
      $('body').addClass('white-content');
    });

    $('.dark-badge').click(() => {
      $('body').removeClass('white-content');
    });
  });

  $('#save-account, #general-save').click((e) => {
    e.preventDefault();
    Swal.fire('Good job!', 'Saved the settings', 'success');
  });

  // Render amount to buy on main and manual
  let percentage2Exec = '';
  for (let index = 1; index <= 100; index++) {
    percentage2Exec += `<option value="${index}">${index}%</option>`;
  }
  $('#main-dip-amount-percentage').html(percentage2Exec);
  $('#main-spike-amount-percentage').html(percentage2Exec);

  // Render amount to buy on main and manual
  $('#main-dip-amount-percentage').val(15);
  $('#main-dip-amount-percentage').trigger('change');
  $('#main-spike-amount-percentage').val(5);
  $('#main-spike-amount-percentage').trigger('change');

  // Stable Main Check
  $('#main-dip-use-market').on('change', function () {
    if ($(this).is(':checked')) {
      $('#main-dip-market-place').prop('disabled', false);
    } else {
      $('#main-dip-market-place').prop('disabled', true);
    }
  });

  // Stable Market Check
  $('#main-dip-use-stable-market').on('change', function () {
    if ($(this).is(':checked')) {
      $('#main-dip-stable-market').prop('disabled', false);
    } else {
      $('#main-dip-stable-market').prop('disabled', true);
    }
  });

  // Init trading view
  // eslint-disable-next-line no-new
  new TradingView.widget(
    {
      width: 980,
      height: 610,
      symbol: `${$('#exchangeID').val().toUpperCase()}:BTCUSDT`,
      interval: '30',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: true,
      container_id: 'trading-view-chart',
    },
  );
});

