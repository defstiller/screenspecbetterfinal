(() => {
  const LINK_PATTERN = /(?:https?:\/\/|hxxps?:\/\/|www\.|<a\s+href=|\[url=|(?:^|[\s(])(?:[a-z0-9-]+\.)+(?:com|net|org|info|biz|io|co|us|ca|uk|ru|cn|xyz|top|site|online|shop|click|link|live|app|dev|me|ly|cc|tv|club|vip|icu|work|win|cloud|pro|fun|store|website|space|today|agency|company|solutions|services|email|tech)(?:[/?#:]|\b))/i;
  const QUIET_SUCCESS_HTML = '<div class="alert alert-success">Thank you! Your request has been received. We will be in touch soon.</div>';

  function valueHasLink(value) {
    if (value == null) {
      return false;
    }

    if (typeof File !== 'undefined' && value instanceof File) {
      return LINK_PATTERN.test(value.name || '');
    }

    return LINK_PATTERN.test(String(value));
  }

  function valuesHaveLink(values) {
    if (!values) {
      return false;
    }

    for (const value of values) {
      if (valueHasLink(value)) {
        return true;
      }
    }

    return false;
  }

  function formDataHasLink(formData) {
    let hasLink = false;

    formData.forEach((value) => {
      if (!hasLink && valueHasLink(value)) {
        hasLink = true;
      }
    });

    return hasLink;
  }

  function formHasLink(form) {
    if (!form || typeof FormData === 'undefined') {
      return false;
    }

    return formDataHasLink(new FormData(form));
  }

  function quietSuccessHtml() {
    return QUIET_SUCCESS_HTML;
  }

  window.formSpamGuard = {
    valueHasLink,
    valuesHaveLink,
    formDataHasLink,
    formHasLink,
    quietSuccessHtml
  };
})();
