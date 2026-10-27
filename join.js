(function () {
  var form = document.getElementById('join');
  var email = document.getElementById('email');
  var err = document.getElementById('err');
  var failed = document.getElementById('failed');
  var btn = document.getElementById('joinbtn');
  var thanks = document.getElementById('thanks');

  function picked(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  function done() {
    form.hidden = true;
    thanks.hidden = false;
    thanks.setAttribute('tabindex', '-1');
    thanks.focus();
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    err.hidden = true;
    failed.hidden = true;
    var v = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { err.hidden = false; email.focus(); return; }
    // Bots fill the hidden field; pretend it worked.
    if (document.getElementById('website').value) { done(); return; }

    var cfg = window.LS_CONFIG || {};
    if (!cfg.supabaseUrl || !cfg.supabaseKey) { failed.hidden = false; return; }

    btn.disabled = true;
    fetch(cfg.supabaseUrl + '/rest/v1/rpc/join_waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': cfg.supabaseKey,
        'Authorization': 'Bearer ' + cfg.supabaseKey
      },
      body: JSON.stringify({
        p_email: v,
        p_children: picked('kids'),
        p_area: document.getElementById('area').value.trim() || null,
        p_tester: document.getElementById('tester').checked
      })
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      done();
    }).catch(function () {
      failed.hidden = false;
    }).then(function () {
      btn.disabled = false;
    });
  });
})();
