document.addEventListener('DOMContentLoaded', function() {
  const tokenBox = document.getElementById('tokenBox');
  const tokenStatus = document.getElementById('tokenStatus');
  const copyButton = document.getElementById('copyButton');
  const error = document.getElementById('error');

  // Check for stored token
  chrome.storage.local.get(['cpToken'], function(result) {
    if (result.cpToken) {
      showToken(result.cpToken);
    }
  });

  function showToken(token) {
    tokenBox.textContent = token;
    tokenBox.style.display = 'block';
    tokenStatus.textContent = 'Token found:';
    copyButton.style.display = 'block';
  }

  copyButton.addEventListener('click', function() {
    chrome.storage.local.get(['cpToken'], function(result) {
      if (result.cpToken) {
        navigator.clipboard.writeText(result.cpToken)
          .then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = 'Copy to Clipboard';
            }, 2000);
          })
          .catch(err => {
            error.textContent = 'Failed to copy: ' + err;
            error.style.display = 'block';
          });
      }
    });
  });
});