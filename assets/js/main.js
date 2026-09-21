/* Joviul Insurance — shared site behaviour */
const JOVIUL_PHONE = '254711446293';

/* ---------- Mobile nav drawer ---------- */
function initNavDrawer(){
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  if(!toggle || !drawer) return;
  const close = () => { drawer.classList.remove('open'); toggle.classList.remove('open'); };
  toggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  drawer.querySelectorAll('a, .nav-drawer-backdrop, .nav-drawer-close').forEach(el => {
    el.addEventListener('click', close);
  });
}

/* ---------- FAQ accordion ---------- */
function initFaq(){
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if(!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if(other !== item){
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
}

/* ---------- Quote form -> WhatsApp / SMS ---------- */
function buildQuoteMessage(productName){
  const fields = {};
  document.querySelectorAll('[data-field]').forEach(el => {
    fields[el.dataset.field] = el.value.trim();
  });
  if(!fields.phone){
    alert('Please enter your phone number so we can reach you.');
    return null;
  }
  let msg = `*${productName} — Quote Request*\n`;
  const labels = {
    name:'Name', phone:'Phone', email:'Email', value:'Vehicle Value',
    reg:'Registration', vtype:'Vehicle Type', cover:'Cover Type', risk:'Risk Class'
  };
  Object.entries(fields).forEach(([k,v]) => {
    if(v) msg += `\n${labels[k] || k}: ${v}`;
  });
  return msg;
}
function sendQuoteWA(productName){
  const msg = buildQuoteMessage(productName);
  if(msg) window.open('https://wa.me/' + JOVIUL_PHONE + '?text=' + encodeURIComponent(msg), '_blank');
}
function sendQuoteSMS(productName){
  const msg = buildQuoteMessage(productName);
  if(msg) window.open('sms:+' + JOVIUL_PHONE + '?body=' + encodeURIComponent(msg));
}
function goCheckout(){ window.location.href = 'checkout.html'; }
function talkAgent(productName){
  window.open('https://wa.me/' + JOVIUL_PHONE + '?text=' + encodeURIComponent('Hi, I need help with ' + productName), '_blank');
}
function sendProductQuote(productName){
  const msg = `Hi, I'd like a quote for *${productName}* from Joviul Insurance.\n\nPlease get in touch with me. Thank you.`;
  window.open('https://wa.me/' + JOVIUL_PHONE + '?text=' + encodeURIComponent(msg), '_blank');
}

/* ---------- Checkout plan selector ---------- */
const CHECKOUT_PLANS = {
  'private-annual':    { price:'KShs. 7,574',  amount:'7,574',  note:'Annual premium' },
  'private-monthly':   { price:'KShs. 3,787',  amount:'3,787',  note:'Instalment × 2 payments' },
  'commercial-annual': { price:'KShs. 7,574',  amount:'7,574',  note:'Annual premium' },
  'commercial-monthly':{ price:'KShs. 3,787',  amount:'3,787',  note:'Instalment × 2 payments' },
  'psv-annual':        { price:'KShs. 88,697', amount:'88,697', note:'PSV annual premium' },
  'psv-monthly':       { price:'KShs. 7,925',  amount:'7,925',  note:'PSV monthly premium' },
};
function updatePlan(){
  const select = document.getElementById('plan-select');
  if(!select) return;
  const p = CHECKOUT_PLANS[select.value];
  document.getElementById('plan-price').textContent = p.price;
  document.getElementById('plan-note').textContent = p.note;
  document.getElementById('mpesa-amount').textContent = p.price;
  document.getElementById('step-amount').textContent = p.amount;
}
function confirmPayment(){
  const select = document.getElementById('plan-select');
  const p = CHECKOUT_PLANS[select.value];
  const planLabel = select.options[select.selectedIndex].text;
  const msg = `Hi, I have paid for my insurance cover via M-PESA.\n\nPlan: ${planLabel}\nAmount: ${p.price}\nPaybill: 247247\nAccount: 0711446293\n\nPlease confirm my cover. Thank you.`;
  window.open('https://wa.me/' + JOVIUL_PHONE + '?text=' + encodeURIComponent(msg), '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  initNavDrawer();
  initFaq();
  if(document.getElementById('plan-select')) updatePlan();
});
