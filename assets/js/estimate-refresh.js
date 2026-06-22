(() => {
  const root = document.querySelector('.app');
  if (!root) return;

  const CONTACT_URL = './contact.html';
  const CALL_URL = 'tel:9047539267';
  const BG = {
    base: 'assets/img/project/VrqI6qDaw7U.webp',
    overview: 'assets/img/project/VrqI6qDaw7U.webp',
    repair: 'assets/img/project/asdasdasd.webp',
    repairScreen: 'assets/img/project/Jw1e2M_t9n4.webp',
    install: 'assets/img/project/5IDYufFZzIQ.webp',
    solid: 'assets/img/project/5IDYufFZzIQ.webp',
    screen: 'assets/img/project/XAgn_8V26nA.jpg',
    house: 'assets/img/project/42RL3FgQte8.webp',
    rolldown: 'assets/img/project/Uv3qZiiGppw.webp',
    walls1: 'assets/img/project/42RL3FgQte8.webp',
    walls2: 'assets/img/project/7Mu1blA1hSE.webp',
    walls3: 'assets/img/project/asdasdasd.webp',
    walls4: 'assets/img/project/XAgn_8V26nA.jpg'
  };

  const CARD_BG = {
    blue: 'linear-gradient(135deg, rgba(57,173,255,0.34), rgba(15,123,214,0.12))',
    deep: 'linear-gradient(135deg, rgba(15,123,214,0.30), rgba(10,8,13,0.12))',
    warm: 'linear-gradient(135deg, rgba(255,182,76,0.28), rgba(15,123,214,0.10))',
    teal: 'linear-gradient(135deg, rgba(27,167,132,0.26), rgba(57,173,255,0.12))',
    slate: 'linear-gradient(135deg, rgba(16,23,33,0.22), rgba(57,173,255,0.10))',
    soft: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(57,173,255,0.16))'
  };

  // Update estimator pricing here. Keep rates and minimums in one place.
  const PRICING = {
    repair: {
      hardwareStart: 125,
      screen: {
        wallSqFt1814: 1.9,
        wallSqFt2020: 2.1,
        roofSqFt1814: 1.9,
        roofSqFt2020: 2.1,
        tripCharge: 295,
        stainlessMultiplier: 1.12
      }
    },
    install: {
      wallSqFt: 10.1,
      screenRoofSqFt: 10.1,
      solidRoofSqFt: { pan: 10, composite: 21 },
      houseWallMinimum: 1436,
      kickPlateLinearFt: 10.5,
      enclosureMinimumThreshold: 4500,
      enclosureMinimumAddon: 500,
      surfaces: {
        slabSqFt: 9,
        slabMin: 2036,
        slabWithFootingSqFt: 10,
        footingMin: 4503,
        paversSqFt: 10,
        paverFootingLinearFt: 55,
        slabFootingLinearFt: 65
      }
    },
    rolldown: {
      openingSqFt: 19,
      minimumPerSystemLowCount: 3522,
      minimumPerSystemHighCount: 3325,
      highCountThreshold: 3
    }
  };

  const state = {
    serviceType: null,
    repairType: null,
    mesh: null,
    roofType: null,
    wallCount: null,
    wallsSame: true,
    wallWidths: [],
    wallHeight: null,
    stainless: null,
    enclosureType: null,
    solidRoofType: null,
    screenWalls: null,
    kickplate: null,
    dims: {},
    nearBeach: null,
    beachOverride: false,
    rolldownCount: null,
    openingsSame: true,
    existingBase: null,
    newBaseType: null,
    existingFooting: null,
    footingPermitted: null,
    limitContact: false,
    leadName: '',
    leadPhone: '',
    leadSubmitting: false,
    leadSubmitted: false,
    leadResponseHtml: ''
  };

  root.innerHTML = `
    <section class='estq-shell'>
      <div class='estq-stage'>
        <div id='estqStep' class='estq-step'>
          <div class='estq-chip-row'>
            <span class='estq-chip'>Free estimate</span>
            <span class='estq-chip'>Local team</span>
          </div>

          <div class='estq-mobile-summary'>
            <button id='estqMobileToggle' class='estq-mobile-summary__bar' type='button' aria-expanded='false' aria-controls='estqMobilePanel'>
              <div class='estq-mobile-summary__bar-main'>
                <div id='estqMobileBadge' class='estq-badge estq-badge--pending'>Start</div>
                <div id='estqMobileAmount' class='estq-mobile-summary__amount'>Choose a project type</div>
              </div>
              <span id='estqMobileToggleLabel' class='estq-mobile-summary__toggle'>View details</span>
            </button>

            <div id='estqMobilePanel' class='estq-mobile-summary__panel estq-hidden'>
              <div id='estqMobileLabel' class='estq-mobile-summary__label'>Estimate</div>
              <div id='estqMobileNote' class='estq-mobile-summary__note'>Answer a few questions to see an estimated price or next step.</div>
              <div id='estqMobileSummaryGrid' class='estq-mobile-summary__grid'></div>
              <div class='estq-mobile-summary__actions'>
                <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead data-estq-open-lead-static>Request on-site quote</button>
              </div>
            </div>
          </div>

          <div class='estq-header'>
            <div class='estq-title-wrap'>
              <span class='estq-eyebrow'>Quick estimate</span>
              <h1 id='estqTitle' class='estq-title'>What do you need help with?</h1>
              <p id='estqSubtitle' class='estq-subtitle'>Choose the closest match. We only ask the questions needed for that job.</p>
              <div class='estq-progress-wrap'>
                <div class='estq-progress' aria-label='Progress'>
                  <div id='estqBar' class='estq-progress__bar'></div>
                </div>
              </div>
            </div>

            <div class='estq-meta'>
              <div class='estq-pill'>Step <strong id='estqIndex'>1</strong> of <span id='estqTotal'>1</span></div>
              <div id='estqTime' class='estq-pill estq-pill--quiet'>About 4 minutes</div>
            </div>
          </div>

          <div id='estqBody' class='estq-card estq-fade'></div>

          <div class='estq-footer'>
            <button id='estqBack' class='estq-btn estq-btn--ghost' type='button'>Back</button>
            <div class='estq-footer__group'>
              <button id='estqReset' class='estq-btn estq-btn--ghost' type='button'>Start over</button>
              <button id='estqNext' class='estq-btn estq-btn--primary' type='button'>Continue</button>
            </div>
          </div>
        </div>

        <aside class='estq-summary'>
          <div class='estq-summary__inner'>
            <div class='estq-quote'>
              <div class='estq-quote__top'>
                <div>
                  <div id='estqQuoteLabel' class='estq-quote__label'>Estimate</div>
                </div>
                <div id='estqQuoteBadge' class='estq-badge estq-badge--pending'>Start</div>
              </div>
              <div id='estqQuoteAmount' class='estq-quote__amount'>Choose a project type</div>
              <div id='estqQuoteNote' class='estq-quote__note'>Answer a few questions to see an estimated price or next step.</div>
              <div id='estqQuoteFine' class='estq-quote__fine'>Online estimate only. Final price may change after field measurements, permit requirements, and site conditions.</div>
            </div>

            <div class='estq-summary-card'>
              <div class='estq-summary-card__head'>
                <h3 class='estq-summary-card__title'>Project details</h3>
                <div id='estqSummaryProgress' class='estq-summary-card__meta'>Ready to begin</div>
              </div>
              <div id='estqSummaryGrid' class='estq-summary-grid'></div>
            </div>

            <div class='estq-summary-panel estq-summary-panel--lean'>
              <h3>Need help?</h3>
              <p>Call or send the project and we will confirm the right next step.</p>
              <div class='estq-summary__cta'>
                <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead data-estq-open-lead-static>Request on-site quote</button>
                ${contactLinkHtml()}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;
  const stepEl = document.getElementById('estqStep');
  const titleEl = document.getElementById('estqTitle');
  const subtitleEl = document.getElementById('estqSubtitle');
  const bodyEl = document.getElementById('estqBody');
  const indexEl = document.getElementById('estqIndex');
  const totalEl = document.getElementById('estqTotal');
  const timeEl = document.getElementById('estqTime');
  const barEl = document.getElementById('estqBar');
  const backBtn = document.getElementById('estqBack');
  const nextBtn = document.getElementById('estqNext');
  const resetBtn = document.getElementById('estqReset');
  const summaryGridEl = document.getElementById('estqSummaryGrid');
  const summaryProgressEl = document.getElementById('estqSummaryProgress');
  const quoteLabelEl = document.getElementById('estqQuoteLabel');
  const quoteBadgeEl = document.getElementById('estqQuoteBadge');
  const quoteAmountEl = document.getElementById('estqQuoteAmount');
  const quoteNoteEl = document.getElementById('estqQuoteNote');
  const quoteFineEl = document.getElementById('estqQuoteFine');
  const mobileToggleEl = document.getElementById('estqMobileToggle');
  const mobileToggleLabelEl = document.getElementById('estqMobileToggleLabel');
  const mobilePanelEl = document.getElementById('estqMobilePanel');
  const mobileBadgeEl = document.getElementById('estqMobileBadge');
  const mobileAmountEl = document.getElementById('estqMobileAmount');
  const mobileLabelEl = document.getElementById('estqMobileLabel');
  const mobileNoteEl = document.getElementById('estqMobileNote');
  const mobileSummaryGridEl = document.getElementById('estqMobileSummaryGrid');

  let stepIndex = 0;
  let mobileSummaryOpen = false;

  function setMobileSummaryOpen(open) {
    mobileSummaryOpen = !!open;
    if (mobilePanelEl) mobilePanelEl.classList.toggle('estq-hidden', !mobileSummaryOpen);
    if (mobileToggleEl) mobileToggleEl.setAttribute('aria-expanded', String(mobileSummaryOpen));
    if (mobileToggleLabelEl) mobileToggleLabelEl.textContent = mobileSummaryOpen ? 'Hide details' : 'View details';
  }

  function goToLeadStep() {
    const flow = getFlow();
    const leadIndex = flow.findIndex((step) => step.id === 'lead');
    if (leadIndex === -1) return;
    stepIndex = leadIndex;
    syncNav();
    scrollEstimatorIntoView();
  }

  function estimatorScrollOffset() {
    const header = document.querySelector('.estimate-page-header');
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    return Math.max(20, Math.ceil(headerBottom + 16));
  }

  function quoteHasVisibleDetails(quote = quoteState()) {
    return quote.badge === 'Live'
      || quote.badge === 'Guide'
      || quote.badge === 'Manual quote'
      || quote.badge === 'Review needed';
  }

  function revealEstimateAfterStepChange() {
    if (window.matchMedia('(max-width: 760px)').matches && quoteHasVisibleDetails()) {
      setMobileSummaryOpen(true);
    }
    scrollEstimatorIntoView();
  }

  function scrollEstimatorIntoView() {
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const isStacked = window.matchMedia('(max-width: 1080px)').matches;
    const target = isMobile
      ? (mobileToggleEl || stepEl)
      : (isStacked ? stepEl : (document.querySelector('.estq-quote') || stepEl));
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const targetRect = target.getBoundingClientRect();
        const targetTop = Math.max(0, window.scrollY + targetRect.top - estimatorScrollOffset());
        window.scrollTo({ top: targetTop, behavior });
      });
    });
  }

  function getFlow() {
    const flow = [];

    flow.push({
      id: 'service',
      title: 'What do you need help with?',
      subtitle: 'Choose the closest match. We only ask the questions needed for that job.',
      bg: BG.overview,
      canNext: () => !!state.serviceType,
      render: renderServiceType,
      actionLabel: 'Continue'
    });

    if (!state.serviceType) return flow;

    if (state.serviceType === 'repair') {
      flow.push({
        id: 'repairType',
        title: 'What kind of repair is this?',
        subtitle: 'Pick the repair type so we can show pricing or the right next step.',
        bg: BG.repair,
        canNext: () => !!state.repairType,
        render: renderRepairType,
        actionLabel: 'Continue'
      });

      if (state.repairType === 'hardware') {
        flow.push({
          id: 'hardwareList',
          title: 'Hardware repair pricing',
          subtitle: 'Use this as a quick guide. Exact parts and labor are confirmed after photos or a quick review.',
          bg: BG.repair,
          canNext: () => true,
          render: renderHardwareList,
          actionLabel: 'Request on-site quote'
        });
        flow.push(leadStep());
        return flow;
      }

      if (state.repairType === 'structural') {
        flow.push({
          id: 'structuralContact',
          title: 'Structural repairs need review',
          subtitle: 'Photos or a site visit are needed before pricing.',
          bg: BG.repair,
          canNext: () => true,
          render: renderStructuralContact,
          actionLabel: 'Request on-site quote'
        });
        flow.push(leadStep());
        return flow;
      }

      if (state.repairType === 'screenReplace') {
        flow.push({ id: 'mesh', title: 'Which screen mesh do you want?', subtitle: 'Pick the mesh you want for the screen replacement.', bg: BG.repairScreen, canNext: () => !!state.mesh, render: renderMesh, actionLabel: 'Continue' });
        flow.push({ id: 'roofType', title: 'What roof type are we rescreening?', subtitle: 'This tells us whether roof mesh is included.', bg: BG.repairScreen, canNext: () => !!state.roofType, render: renderRoofType, actionLabel: 'Continue' });
        flow.push({ id: 'wallCount', title: 'How many screen walls are included?', subtitle: 'Choose up to four walls for the online estimate.', bg: BG.repair, canNext: () => state.wallCount !== null, render: renderWallCount, actionLabel: 'Continue' });

        if (state.wallCount === 'more') {
          flow.push({
            id: 'limitContact',
            title: 'This layout needs a custom quote',
            subtitle: 'Large or unusual layouts are better reviewed by a person.',
            bg: BG.repair,
            canNext: () => true,
            render: renderLimitContact,
            actionLabel: 'Request on-site quote'
          });
          flow.push(leadStep());
          return flow;
        }

        if (Number.isInteger(state.wallCount)) {
          flow.push({ id: 'measurements', title: 'Add rough measurements', subtitle: 'Enter rough wall width and height in feet.', bg: BG.repairScreen, canNext: () => validateScreenReplaceMeasurements().ok, render: renderScreenReplaceMeasurements, actionLabel: 'Continue' });
          flow.push({ id: 'stainless', title: 'Do you want to replace the old fasteners and tapcons?', subtitle: 'If yes, the estimate includes stainless replacement fasteners and tapcons.', bg: BG.repairScreen, canNext: () => state.stainless !== null, render: renderStainless, actionLabel: 'Continue' });
        }

        flow.push(doneStep());
        flow.push(leadStep());
        return flow;
      }

      flow.push(leadStep());
      return flow;
    }

    if (state.serviceType === 'install') {
      flow.push({ id: 'type', title: 'Which system fits your project?', subtitle: 'Choose the system that best matches the project.', bg: BG.install, canNext: () => !!state.enclosureType, render: renderType, actionLabel: 'Continue' });

      if (!state.enclosureType) {
        flow.push(leadStep());
        return flow;
      }

      if (state.enclosureType === 'glass') {
        flow.push({ id: 'glassInfo', title: 'Glass enclosures need a manual quote', subtitle: 'We can give you guide pricing, but the final number depends on the exact glass and window layout.', bg: BG.install, canNext: () => true, render: renderGlassInfo, actionLabel: 'Continue' });
        flow.push(leadStep());
        return flow;
      }

      if (state.enclosureType === 'solid') {
        flow.push({ id: 'solidRoofType', title: 'Which solid roof do you want?', subtitle: 'Choose the roof system that best fits the project and budget.', bg: BG.solid, canNext: () => !!state.solidRoofType, render: renderSolidRoofType, actionLabel: 'Continue' });
      }

      if (['solid', 'screen', 'house'].includes(state.enclosureType)) {
        flow.push({ id: 'walls', title: 'How many screen walls will the enclosure have?', subtitle: 'Count only the screened sides. Do not count the side that connects back to the house.', bg: bgForWalls(), canNext: () => Number.isInteger(state.screenWalls), render: renderWalls, actionLabel: 'Continue' });
        flow.push({ id: 'size', title: 'What is the rough size?', subtitle: 'Enter rough wall lengths and one wall height in feet.', bg: bgForWalls(), canNext: () => validateDimsForWalls().ok, render: renderDimsForWalls, actionLabel: 'Continue' });
        flow.push({ id: 'kickplate', title: 'Do you want a kick plate on the walls?', subtitle: 'Kick plate adds aluminum protection along the bottom of the screen walls.', bg: bgForWalls(), canNext: () => state.kickplate !== null, render: renderKickplate, actionLabel: 'Continue' });
      }

      if (['solid', 'screen'].includes(state.enclosureType) && validateDimsForWalls().ok && state.kickplate !== null) {
        flow.push({ id: 'baseExisting', title: 'Do you already have slab or pavers?', subtitle: 'This changes whether we need to include slab, pavers, or footing work in the estimate.', bg: bgForWalls(), canNext: () => !!state.existingBase, render: renderBaseExisting, actionLabel: 'Continue' });

        if (state.existingBase === 'none') {
          flow.push({ id: 'newBaseType', title: 'What should we add under the enclosure?', subtitle: 'Choose whether you want slab or pavers added before the enclosure build.', bg: bgForWalls(), canNext: () => !!state.newBaseType, render: renderNewBaseType, actionLabel: 'Continue' });
        }

        if (state.existingBase === 'slab' && roofAreaForInstall() > 350) {
          flow.push({ id: 'existingFooting', title: 'Does the slab already have a footing for the enclosure?', subtitle: 'Most enclosures this size are required to have a footing.', bg: bgForWalls(), canNext: () => state.existingFooting !== null, render: renderExistingFooting, actionLabel: 'Continue' });

          if (state.existingFooting === true) {
            flow.push({ id: 'footingPermitted', title: 'Was that footing permitted?', subtitle: 'We ask because the enclosure permit usually depends on the footing permit record.', bg: bgForWalls(), canNext: () => state.footingPermitted !== null, render: renderFootingPermitted, actionLabel: 'Continue' });

            if (state.footingPermitted === false) {
              flow.push({ id: 'permitInfo', title: 'Existing footing needs permit confirmation', subtitle: 'To pull a permit for the enclosure, the footing needs to be permitted.', bg: bgForWalls(), canNext: () => true, render: renderPermitInfo, actionLabel: 'Continue' });
            }
          }
        }

        if (state.existingBase === 'pavers') {
          flow.push({ id: 'existingFooting', title: 'Do the pavers already have a footing for the enclosure?', subtitle: 'Pavers are required to have a footing for the enclosure.', bg: bgForWalls(), canNext: () => state.existingFooting !== null, render: renderExistingFooting, actionLabel: 'Continue' });
        }
      }

      if (state.enclosureType === 'rolldown') {
        flow.push({ id: 'beach', title: 'Is the project near the beach?', subtitle: 'Beach and high-wind areas can change the product and price.', bg: BG.rolldown, canNext: () => (state.nearBeach === false) || (state.nearBeach === true && state.beachOverride === true), render: renderBeach, actionLabel: 'Continue' });
        flow.push({ id: 'rdCount', title: 'How many openings need rolldowns?', subtitle: 'Start with the number of openings.', bg: BG.rolldown, canNext: () => Number.isInteger(state.rolldownCount), render: renderRolldownCount, actionLabel: 'Continue' });
        flow.push({ id: 'openings', title: 'What size are the openings?', subtitle: 'Enter rough opening height and width in inches.', bg: BG.rolldown, canNext: () => validateOpenings().ok, render: renderOpenings, actionLabel: 'Continue' });
      }

      flow.push(doneStep());
      flow.push(leadStep());
      return flow;
    }

    return flow;
  }
  function doneStep() {
    return {
      id: 'done',
      title: 'Your estimate is ready',
      subtitle: 'Review the details, then request an on-site quote if the estimate looks right.',
      bg: finalBg(),
      canNext: () => true,
      render: renderDone,
      actionLabel: 'Request on-site quote'
    };
  }

  function leadStep() {
    return {
      id: 'lead',
      title: 'Ready to proceed with an on-site quote?',
      subtitle: 'Leave your name and phone number and we will reach out about the next step.',
      bg: finalBg(),
      canNext: () => validateLead().ok && !state.leadSubmitting && !state.leadSubmitted,
      render: renderLeadForm,
      nextAction: 'submitLead',
      actionLabel: state.leadSubmitted ? 'Request sent' : (state.leadSubmitting ? 'Sending...' : 'Send request')
    };
  }
  function finalBg() {
    if (state.serviceType === 'repair') {
      if (state.repairType === 'screenReplace') return BG.repairScreen;
      return BG.repair;
    }
    if (state.enclosureType === 'solid') return BG.solid;
    if (state.enclosureType === 'screen') return BG.screen;
    if (state.enclosureType === 'house') return BG.house;
    if (state.enclosureType === 'rolldown') return BG.rolldown;
    return BG.base;
  }

  function bgForWalls() {
    const count = state.screenWalls;
    if (count === 1) return BG.walls1;
    if (count === 2) return BG.walls2;
    if (count === 3) return BG.walls3;
    if (count === 4) return BG.walls4;
    if (state.enclosureType === 'solid') return BG.solid;
    if (state.enclosureType === 'screen') return BG.screen;
    if (state.enclosureType === 'house') return BG.house;
    return BG.install;
  }

  function syncNav(options = {}) {
    const { rerenderStep = true } = options;
    const flow = getFlow();
    const total = flow.length;
    stepIndex = Math.max(0, Math.min(stepIndex, total - 1));
    const step = flow[stepIndex];
    const pct = total <= 1 ? (state.serviceType ? 100 : 0) : (stepIndex / (total - 1)) * 100;

    titleEl.textContent = step.title;
    subtitleEl.textContent = step.subtitle;
    indexEl.textContent = String(stepIndex + 1);
    totalEl.textContent = String(total);
    timeEl.textContent = humanStepHint(stepIndex, total, step);
    summaryProgressEl.textContent = completionText(stepIndex, total, step);
    barEl.style.width = `${pct}%`;
    setStepBackground(step.bg || BG.base);

    backBtn.disabled = stepIndex === 0;
    backBtn.style.opacity = backBtn.disabled ? '0.45' : '1';
    nextBtn.textContent = step.actionLabel || 'Continue';
    nextBtn.disabled = !step.canNext();
    nextBtn.style.opacity = nextBtn.disabled ? '0.45' : '1';

    if (rerenderStep) {
      bodyEl.classList.remove('estq-fade');
      void bodyEl.offsetWidth;
      bodyEl.classList.add('estq-fade');
      step.render();
    }

    renderSummary();
    refreshActiveInlineHint();
    persistDraft();
  }
  function setStepBackground(src) {
    const value = src ? `url('${src}')` : 'none';
    stepEl.style.setProperty('--estq-step-image', value);
  }

  function estimateStepSeconds(stepOrId) {
    const id = typeof stepOrId === 'string' ? stepOrId : (stepOrId.id || '');
    if (id === 'service') return 20;
    if (id === 'repairType' || id === 'type' || id === 'walls' || id === 'mesh' || id === 'roofType' || id === 'solidRoofType' || id === 'kickplate' || id === 'baseExisting' || id === 'newBaseType' || id === 'existingFooting' || id === 'footingPermitted' || id === 'beach' || id === 'rdCount' || id === 'stainless') return 25;
    if (id === 'measurements' || id === 'size' || id === 'openings') return 70;
    if (id === 'hardwareList' || id === 'structuralContact' || id === 'limitContact' || id === 'permitInfo' || id === 'glassInfo') return 15;
    if (id === 'done') return 20;
    if (id === 'lead') return 50;
    return 30;
  }

  function projectedTimingFlowIds() {
    if (!state.serviceType) return ['service'];

    if (state.serviceType === 'repair') {
      if (!state.repairType) return ['service', 'repairType', 'mesh', 'roofType', 'wallCount', 'measurements', 'stainless', 'done', 'lead'];
      if (state.repairType === 'hardware') return ['service', 'repairType', 'hardwareList', 'lead'];
      if (state.repairType === 'structural') return ['service', 'repairType', 'structuralContact', 'lead'];
      return ['service', 'repairType', 'mesh', 'roofType', 'wallCount', 'measurements', 'stainless', 'done', 'lead'];
    }

    if (state.serviceType === 'install') {
      if (!state.enclosureType) {
        return ['service', 'type', 'solidRoofType', 'walls', 'size', 'kickplate', 'baseExisting', 'newBaseType', 'existingFooting', 'footingPermitted', 'permitInfo', 'done', 'lead'];
      }

      if (state.enclosureType === 'rolldown') {
        return ['service', 'type', 'beach', 'rdCount', 'openings', 'done', 'lead'];
      }

      if (state.enclosureType === 'glass') {
        return ['service', 'type', 'glassInfo', 'lead'];
      }

      if (state.enclosureType === 'house') {
        return ['service', 'type', 'walls', 'size', 'kickplate', 'done', 'lead'];
      }

      if (state.enclosureType === 'screen') {
        return ['service', 'type', 'walls', 'size', 'kickplate', 'baseExisting', 'newBaseType', 'existingFooting', 'footingPermitted', 'permitInfo', 'done', 'lead'];
      }

      return ['service', 'type', 'solidRoofType', 'walls', 'size', 'kickplate', 'baseExisting', 'newBaseType', 'existingFooting', 'footingPermitted', 'permitInfo', 'done', 'lead'];
    }

    return ['service'];
  }

  function humanStepHint(index, total, step) {
    if (step.nextAction) return 'Ready to send';
    if (!state.serviceType) return 'About 4 minutes';

    const projectedIds = projectedTimingFlowIds();
    const currentIndex = Math.max(0, projectedIds.indexOf(step.id));
    const secondsLeft = projectedIds
      .slice(currentIndex)
      .reduce((sum, id) => sum + estimateStepSeconds(id), 0);

    if (secondsLeft >= 300) return 'About 4 minutes left';
    if (secondsLeft >= 210) return 'About 3 minutes left';
    if (secondsLeft >= 120) return 'About 2 minutes left';
    if (secondsLeft >= 45) return 'About 1 minute left';
    if (secondsLeft >= 20) return 'About 30 seconds left';
    return 'Almost there';
  }

  function completionText(index, total, step) {
    if (!state.serviceType) return 'Ready to begin';
    if (step.nextAction) return 'Ready for final step';
    const pct = total <= 1 ? 100 : Math.round((index / (total - 1)) * 100);
    return `${pct}% complete`;
  }

  function next() {
    const flow = getFlow();
    const step = flow[stepIndex];
    if (!step.canNext()) return;
    if (step.nextAction) {
      handleStepAction(step);
      return;
    }
    if (stepIndex < flow.length - 1) stepIndex += 1;
    syncNav();
    revealEstimateAfterStepChange();
  }

  function back() {
    if (stepIndex > 0) stepIndex -= 1;
    syncNav();
    scrollEstimatorIntoView();
  }

  function handleStepAction(step) {
    persistDraft();
    if (step.nextAction === 'submitLead') {
      submitLead();
      return;
    }
    if (step.nextAction === 'call') window.location.href = CALL_URL;
  }

  function resetAll() {
    state.serviceType = null;
    resetRepairBranch();
    resetInstallBranch();
    state.leadName = '';
    state.leadPhone = '';
    state.leadSubmitting = false;
    state.leadSubmitted = false;
    state.leadResponseHtml = '';
    stepIndex = 0;
    syncNav();
  }

  function persistDraft() {
    try {
      localStorage.setItem('estimateDraft', JSON.stringify({ savedAt: Date.now(), state }));
    } catch (err) {
      // no-op
    }
  }

  backBtn.addEventListener('click', back);
  nextBtn.addEventListener('click', next);
  resetBtn.addEventListener('click', resetAll);
  root.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-estq-open-lead]');
    if (!trigger) return;
    event.preventDefault();
    goToLeadStep();
  });
  if (mobileToggleEl) {
    mobileToggleEl.addEventListener('click', () => {
      setMobileSummaryOpen(!mobileSummaryOpen);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
    next();
  });
  function renderServiceType() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'install', tag: 'New project', title: 'New install or rebuild', desc: 'For new enclosures, rebuilds, glass enclosures, house-roof tie-ins, or rolldown systems.', thumb: BG.install, bg: CARD_BG.blue })}
        ${choiceCard({ key: 'repair', tag: 'Existing enclosure', title: 'Repair and replacement', desc: 'For existing enclosures that need screen work, hardware, or structural repair.', thumb: BG.repair, bg: CARD_BG.deep })}
      </div>
    `;

    wireChoiceGroup('serviceType', ['repair', 'install'], (value) => {
      if (state.serviceType !== value) {
        resetRepairBranch();
        resetInstallBranch();
        state.serviceType = value;
        stepIndex = 0;
      }
      syncNav();
    });
  }

  function renderRepairType() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'hardware', tag: 'Smaller repairs', title: 'Hardware replacement', desc: 'Door kits, sweeps, cables, and other common wear items.', thumb: BG.house, bg: CARD_BG.slate })}
        ${choiceCard({ key: 'screenReplace', tag: 'Online price', title: 'Screen replacement', desc: 'Best if you want a screen replacement price range online.', thumb: BG.repairScreen, bg: CARD_BG.teal })}
        ${choiceCard({ key: 'structural', tag: 'Manual review', title: 'Structural repair', desc: 'Bent framing, storm damage, and other structural issues.', thumb: BG.screen, bg: CARD_BG.warm })}
      </div>
    `;

    wireChoiceGroup('repairType', ['hardware', 'screenReplace', 'structural'], (value) => {
      if (state.repairType !== value) {
        resetRepairBranch();
        state.repairType = value;
      }
      syncNav();
    });
  }

  function renderHardwareList() {
    bodyEl.innerHTML = `
      <div class='estq-stack'>
        <div class='estq-message'>
          <h3>Common hardware pricing</h3>
          <div class='estq-price-list'>
            <div class='estq-price-row'><span>Service call</span><strong>$125</strong></div>
            <div class='estq-price-row'><span>Door kit</span><strong>$75</strong></div>
            <div class='estq-price-row'><span>Bug sweep</span><strong>$25</strong></div>
            <div class='estq-price-row'><span>Door kick plate replacement</span><strong>$80</strong></div>
            <div class='estq-price-row'><span>Cable replacement</span><strong>$100</strong></div>
            <div class='estq-price-row'><span>Cable adjustment</span><strong>$15</strong></div>
          </div>
          <p class='estq-note'>Service call is charged once per visit. Exact parts and labor are confirmed after photos or a quick review.</p>
          <div class='estq-actions'>
            <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead>Request on-site quote</button>
            ${contactLinkHtml()}
          </div>
        </div>
      </div>
    `;
  }
  function renderStructuralContact() {
    bodyEl.innerHTML = `
      <div class='estq-stack'>
        <div class='estq-message'>
          <h3>Structural repairs need a quick review</h3>
          <p>Bent framing, storm damage, and rebuild work need photos or a site visit before we can price them properly.</p>
          <ul class='estq-list'>
            <li>Best for storm damage, sagging members, bent framing, or rebuild conditions.</li>
            <li>Photos and a few details speed up the review.</li>
            <li>We will tell you quickly whether it is a repair, partial rebuild, or replacement.</li>
          </ul>
          <div class='estq-actions'>
            <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead>Request on-site quote</button>
            ${contactLinkHtml()}
          </div>
        </div>
      </div>
    `;
  }
  function renderLimitContact() {
    bodyEl.innerHTML = `
      <div class='estq-stack'>
        <div class='estq-message'>
          <h3>This layout needs a custom quote</h3>
          <p>Projects with more than four walls or unusual geometry are better reviewed by a person than forced through rough math.</p>
          <ul class='estq-list'>
            <li>Best for larger layouts, custom shapes, and non-standard framing.</li>
            <li>Photos or a sketch help us quote it faster.</li>
            <li>Use the button below for a custom estimate.</li>
          </ul>
          <div class='estq-actions'>
            <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead>Request on-site quote</button>
            ${contactLinkHtml()}
          </div>
        </div>
      </div>
    `;
  }
  function renderMesh() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: '1814', tag: 'Standard mesh', title: '18 / 14 screen', desc: 'Standard mesh for everyday screening.', thumb: BG.screen, bg: CARD_BG.blue })}
        ${choiceCard({ key: '2020', tag: 'Finer mesh', title: '20 / 20 no-see-um', desc: 'Smaller mesh for tiny insects.', thumb: BG.repairScreen, bg: CARD_BG.teal })}
      </div>
    `;

    wireChoiceGroup('mesh', ['1814', '2020'], (value) => {
      state.mesh = value;
      syncNav();
    });
  }

  function renderRoofType() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'screen', tag: 'Roof included', title: 'Screen roof', desc: 'Includes roof mesh and wall screens.', thumb: BG.screen, bg: CARD_BG.blue })}
        ${choiceCard({ key: 'solid', tag: 'Walls only', title: 'Solid roof', desc: 'Prices the walls only.', thumb: BG.solid, bg: CARD_BG.soft })}
      </div>
    `;

    wireChoiceGroup('roofType', ['screen', 'solid'], (value) => {
      state.roofType = value;
      syncNav();
    });
  }

  function renderWallCount() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: '1', title: '1 wall', desc: 'One screen wall.', bg: CARD_BG.blue })}
        ${choiceCard({ key: '2', title: '2 walls', desc: 'Two screen walls.', bg: CARD_BG.blue })}
        ${choiceCard({ key: '3', title: '3 walls', desc: 'Three screen walls.', bg: CARD_BG.blue })}
        ${choiceCard({ key: '4', title: '4 walls', desc: 'Four screen walls.', bg: CARD_BG.blue })}
        ${choiceCard({ key: 'more', title: 'More than 4', desc: 'Route this for a manual quote.', bg: CARD_BG.warm })}
      </div>
    `;

    wireChoiceGroup('wallCount', ['1', '2', '3', '4', 'more'], (value) => {
      if (value === 'more') {
        state.wallCount = 'more';
        syncNav();
        return;
      }
      const count = parseInt(value, 10);
      state.wallCount = count;
      state.wallWidths = Array.from({ length: count }, (_, index) => state.wallWidths[index] ?? '');
      syncNav();
    });
  }

  function renderScreenReplaceMeasurements() {
    const count = state.wallCount;
    const widths = state.wallWidths ?? [];
    const height = state.wallHeight ?? '';

    bodyEl.innerHTML = `
      <div class='estq-toggle'>
        <input id='estqWallsSame' type='checkbox' ${state.wallsSame ? 'checked' : ''}>
        <div>
          <div style='font-weight:700'>All wall widths are roughly the same</div>
          <div class='estq-note'>If checked, enter one width and the estimator will reuse it for every wall.</div>
        </div>
      </div>

      <div class='estq-fields'>
        <div class='estq-row'>
          <div>
            <label class='estq-label' for='estqWallHeight'>Wall height (ft)</label>
            <input id='estqWallHeight' class='estq-input' type='number' min='0' step='0.5' placeholder='e.g. 11'>
          </div>
          <div></div>
        </div>

        <div id='estqWidthFields' class='estq-fields'></div>
      </div>

      <div class='estq-note'>Measurements are used only for an online estimate. Final field measurements still happen before installation.</div>
      <div id='estqInlineHint'></div>
    `;

    const sameCheckbox = document.getElementById('estqWallsSame');
    sameCheckbox.addEventListener('change', () => {
      state.wallsSame = sameCheckbox.checked;
      syncNav();
    });

    const heightInput = document.getElementById('estqWallHeight');
    heightInput.value = height;
    heightInput.addEventListener('input', () => {
      const value = heightInput.value.trim();
      state.wallHeight = value === '' ? null : Number(value);
      syncNav({ rerenderStep: false });
    });

    const host = document.getElementById('estqWidthFields');

    if (state.wallsSame) {
      host.innerHTML = `
        <div class='estq-row'>
          <div>
            <label class='estq-label' for='estqWallWidthAll'>Wall width (ft)</label>
            <input id='estqWallWidthAll' class='estq-input' type='number' min='0' step='0.5' placeholder='e.g. 10'>
          </div>
          <div></div>
        </div>
      `;

      const allInput = document.getElementById('estqWallWidthAll');
      allInput.value = widths[0] ?? '';
      allInput.addEventListener('input', () => {
        const value = allInput.value.trim();
        const number = value === '' ? '' : Number(value);
        state.wallWidths = Array.from({ length: count }, () => number);
        syncNav({ rerenderStep: false });
      });
    } else {
      host.innerHTML = Array.from({ length: count }, (_, index) => `
        <div class='estq-row'>
          <div>
            <label class='estq-label' for='estqWallWidth${index}'>Wall ${index + 1} width (ft)</label>
            <input id='estqWallWidth${index}' class='estq-input' type='number' min='0' step='0.5' placeholder='e.g. 10'>
          </div>
          <div></div>
        </div>
      `).join('');

      for (let index = 0; index < count; index += 1) {
        const input = document.getElementById(`estqWallWidth${index}`);
        input.value = widths[index] ?? '';
        input.addEventListener('input', () => {
          const value = input.value.trim();
          const number = value === '' ? '' : Number(value);
          const nextWidths = [...(state.wallWidths ?? [])];
          nextWidths[index] = number;
          state.wallWidths = nextWidths;
          syncNav({ rerenderStep: false });
        });
      }
    }

    const validation = validateScreenReplaceMeasurements();
    setInlineHint(validation.ok ? '' : validation.msg);
  }

  function renderStainless() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'no', tag: 'Leave as is', title: 'Do not replace fasteners and tapcons', desc: 'Leave the existing fasteners and tapcons out of the estimate.', bg: CARD_BG.soft })}
        ${choiceCard({ key: 'yes', tag: 'Replace them', title: 'Yes, replace fasteners and tapcons', desc: 'Add stainless replacement fasteners and tapcons to the estimate.', bg: CARD_BG.warm })}
      </div>
    `;

    wireChoiceGroup('_stainless', ['no', 'yes'], (value) => {
      state.stainless = value === 'yes';
      syncNav();
    }, () => {
      if (state.stainless === null) return null;
      return state.stainless ? 'yes' : 'no';
    });
  }

  function renderType() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'solid', tag: 'Solid roof', title: 'Solid roof enclosure', desc: 'Covered enclosure with screen walls and a solid roof system.', thumb: BG.solid, bg: CARD_BG.blue })}
        ${choiceCard({ key: 'screen', tag: 'Screen roof', title: 'Screen roof enclosure', desc: 'Screen walls plus a screened roof for airflow and coverage.', thumb: BG.screen, bg: CARD_BG.teal })}
        ${choiceCard({ key: 'house', tag: 'Existing roof', title: 'Existing house roof', desc: 'Screen walls built under the existing house roof line.', thumb: BG.house, bg: CARD_BG.slate })}
        ${choiceCard({ key: 'glass', tag: 'Manual quote', title: 'Glass enclosure', desc: 'Glass rooms and window-heavy enclosure builds that need a manual quote.', thumb: BG.install, bg: CARD_BG.soft })}
        ${choiceCard({ key: 'rolldown', tag: 'Openings only', title: 'Electronic rolldown system', desc: 'Motorized screens for openings and covered patios.', thumb: BG.rolldown, bg: CARD_BG.deep })}
      </div>
    `;

    wireChoiceGroup('enclosureType', ['solid', 'screen', 'house', 'glass', 'rolldown'], (value) => {
      if (state.enclosureType !== value) {
        state.enclosureType = value;
        state.solidRoofType = null;
        state.screenWalls = null;
        state.kickplate = null;
        state.dims = {};
        state.nearBeach = null;
        state.beachOverride = false;
        state.rolldownCount = null;
        state.openingsSame = true;
        state.existingBase = null;
        state.newBaseType = null;
        state.existingFooting = null;
        state.footingPermitted = null;
      }
      syncNav();
    });
  }

  function renderGlassInfo() {
    bodyEl.innerHTML = `
      <div class='estq-stack'>
        <div class='estq-message'>
          <h3>Glass enclosures need a manual quote</h3>
          <p>Due to the site-specific requirements of the glass and window layout, we are not able to give a true online estimate for this type of project.</p>
          <ul class='estq-list'>
            <li>Guide pricing is roughly $1,200 per door.</li>
            <li>Guide pricing is roughly $1,000 per window.</li>
            <li>The frame for the future enclosure usually starts around $1,000.</li>
            <li>Engineering and permitting often add about $500 depending on the size and the county.</li>
          </ul>
          <p>If you want the real number, request an on-site quote and we will walk the project with you.</p>
          <div class='estq-actions'>
            <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead>Request on-site quote</button>
            ${contactLinkHtml()}
          </div>
        </div>
      </div>
    `;
  }

  function renderSolidRoofType() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'composite', tag: 'Best overall', title: '3" insulated composite roof', desc: 'Best for noise, insulation, and long-term durability.', thumb: BG.solid, bg: CARD_BG.blue })}
        ${choiceCard({ key: 'pan', tag: 'Budget option', title: 'Pan roof', desc: 'Budget-friendly sheet metal roof system.', thumb: BG.install, bg: CARD_BG.soft })}
      </div>
    `;

    wireChoiceGroup('_solidRoofType', ['composite', 'pan'], (value) => {
      state.solidRoofType = value;
      syncNav();
    }, () => state.solidRoofType);
  }

  function renderWalls() {
    const wallCountHelp = state.enclosureType === 'house' ? '' : `
      <div class='estq-wall-help'>
        <div class='estq-wall-help__eyebrow'>Quick explanation</div>
        <h3>Count only the screened sides</h3>
        <p>If one side connects back to your house, that side is not a screen wall.</p>
        <div class='estq-wall-help__grid'>
          <div class='estq-wall-help__item'><strong>1 wall</strong><span>Front wall only</span></div>
          <div class='estq-wall-help__item'><strong>2 walls</strong><span>Front wall plus one side</span></div>
          <div class='estq-wall-help__item'><strong>3 walls</strong><span>Front wall plus both sides</span></div>
          <div class='estq-wall-help__item'><strong>4 walls</strong><span>Front, both sides, and the back</span></div>
        </div>
      </div>
    `;

    bodyEl.innerHTML = `
      ${wallCountHelp}
      <div class='estq-grid'>
        ${choiceCard({ key: '1', tag: 'Front only', title: '1 screen wall', desc: 'Only the front is screened. The other sides connect back to the house or existing structure.', bg: CARD_BG.blue })}
        ${choiceCard({ key: '2', tag: 'Front + one side', title: '2 screen walls', desc: 'The front and one side are screened. Another side ties back into the house.', bg: CARD_BG.blue })}
        ${choiceCard({ key: '3', tag: 'Front + both sides', title: '3 screen walls', desc: 'The front and both sides are screened. The back side usually ties into the house.', bg: CARD_BG.blue })}
        ${choiceCard({ key: '4', tag: 'Fully screened', title: '4 screen walls', desc: 'All four sides are screened with no house connection counted as a wall.', bg: CARD_BG.blue })}
      </div>
    `;
    wireChoiceGroup('screenWalls', ['1', '2', '3', '4'], (value) => {
      const count = parseInt(value, 10);
      if (state.screenWalls !== count) {
        state.screenWalls = count;
        state.kickplate = null;
        state.dims = {};
        state.existingBase = null;
        state.newBaseType = null;
        state.existingFooting = null;
        state.footingPermitted = null;
      }
      syncNav();
    });
  }
  function renderDimsForWalls() {
    const fields = dimsFieldsForWalls(state.screenWalls);
    const projectionHelp = state.screenWalls === 1 && state.enclosureType !== 'house'
      ? `
        <div class='estq-alert'>
          <div><strong>What is projection / depth?</strong></div>
          <div class='estq-note'>For a 1-wall enclosure, projection is the roof depth from the front screen wall back to the house connection.</div>
        </div>
      `
      : '';

    bodyEl.innerHTML = `
      ${projectionHelp}
      <div class='estq-fields'>
        ${numberField('wallHeight', 'Wall height (ft)', 'e.g. 10')}
        ${fields.map((field) => numberField(field.key, field.label, field.placeholder)).join('')}
      </div>
      <div class='estq-note'>Enter rough dimensions in feet. The wall height applies to all open screen walls.</div>
      <div id='estqInlineHint'></div>
    `;

    const heightInput = document.getElementById('wallHeight');
    heightInput.value = state.dims.wallHeight ?? '';
    heightInput.addEventListener('input', () => {
      const value = heightInput.value.trim();
      state.dims.wallHeight = value === '' ? '' : Number(value);
      syncNav({ rerenderStep: false });
    });

    fields.forEach((field) => {
      const input = document.getElementById(field.key);
      input.value = state.dims[field.key] ?? '';
      input.addEventListener('input', () => {
        const value = input.value.trim();
        state.dims[field.key] = value === '' ? '' : Number(value);
        syncNav({ rerenderStep: false });
      });
    });

    const validation = validateDimsForWalls();
    setInlineHint(validation.ok ? '' : validation.msg);
  }

  function renderKickplate() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'no', tag: 'No kick plate', title: 'No', desc: 'Skip the aluminum kick plate on the bottom of the walls.', bg: CARD_BG.soft })}
        ${choiceCard({ key: 'yes', tag: 'Add protection', title: 'Yes', desc: 'Add kick plate protection along the bottom of the screen walls.', bg: CARD_BG.warm })}
      </div>
    `;

    wireChoiceGroup('_kickplate', ['no', 'yes'], (value) => {
      state.kickplate = value === 'yes';
      syncNav();
    }, () => {
      if (state.kickplate === null) return null;
      return state.kickplate ? 'yes' : 'no';
    });
  }

  function renderBeach() {
    const showWarning = state.nearBeach === true && !state.beachOverride;

    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'no', tag: 'Standard conditions', title: 'No', desc: 'Standard inland conditions.', bg: CARD_BG.teal })}
        ${choiceCard({ key: 'yes', tag: 'Needs review', title: 'Yes', desc: 'Near beach or high-wind area.', bg: CARD_BG.warm })}
      </div>

      ${rolldownInfoDisclosure()}

      <div id='estqBeachWarning' class='${showWarning ? '' : 'estq-hidden'}' style='margin-top:12px;'>
        <div class='estq-alert'>
          <div><strong>This project needs a wind review</strong></div>
          <div class='estq-note'>You can still continue for a rough starting price.</div>
          <div><button id='estqContinueAnyway' class='estq-btn estq-btn--danger' type='button'>Continue anyway</button></div>
        </div>
      </div>
    `;

    wireChoiceGroup('_beach', ['no', 'yes'], (value) => {
      const near = value === 'yes';
      state.nearBeach = near;
      if (!near) state.beachOverride = false;
      syncNav();
    }, () => {
      if (state.nearBeach === null) return null;
      return state.nearBeach ? 'yes' : 'no';
    });

    const button = document.getElementById('estqContinueAnyway');
    if (button) {
      button.addEventListener('click', () => {
        state.beachOverride = true;
        syncNav();
      });
    }
  }

  function renderRolldownCount() {
    const cards = [1, 2, 3, 4, 5, 6].map((count) => choiceCard({ key: String(count), title: `${count} opening${count === 1 ? '' : 's'}`, desc: count === 1 ? 'Single rolldown opening.' : `${count} rolldown openings.`, bg: CARD_BG.blue })).join('');
    bodyEl.innerHTML = `<div class='estq-grid'>${cards}</div>`;

    wireChoiceGroup('rolldownCount', ['1', '2', '3', '4', '5', '6'], (value) => {
      const count = parseInt(value, 10);
      if (state.rolldownCount !== count) {
        state.rolldownCount = count;
        state.dims = {};
      }
      syncNav();
    });
  }

  function renderOpenings() {
    const count = state.rolldownCount || 0;

    bodyEl.innerHTML = `
      <div class='estq-toggle'>
        <input id='estqSameOpenings' type='checkbox' ${state.openingsSame ? 'checked' : ''}>
        <div>
          <div style='font-weight:700'>All openings are roughly the same size</div>
          <div class='estq-note'>If checked, you only need to enter one height and width pair for all openings.</div>
        </div>
      </div>

      <div id='estqOpeningFields' class='estq-fields'></div>
      <div id='estqInlineHint'></div>
    `;

    const sameCheckbox = document.getElementById('estqSameOpenings');
    sameCheckbox.addEventListener('change', () => {
      state.openingsSame = sameCheckbox.checked;
      syncNav();
    });

    const host = document.getElementById('estqOpeningFields');
    const pair = (prefix, label) => {
      const heightKey = `${prefix}_h`;
      const widthKey = `${prefix}_w`;
      return `
        <div class='estq-message'>
          <div style='display:flex; justify-content:space-between; gap:10px; align-items:center;'>
            <div style='font-weight:700'>${label}</div>
            <div class='estq-note'>inches</div>
          </div>
          <div class='estq-row' style='margin-top:12px;'>
            <div>
              <label class='estq-label' for='${heightKey}'>Height</label>
              <input id='${heightKey}' class='estq-input' type='number' inputmode='decimal' min='0' step='1' placeholder='e.g. 96'>
            </div>
            <div>
              <label class='estq-label' for='${widthKey}'>Width</label>
              <input id='${widthKey}' class='estq-input' type='number' inputmode='decimal' min='0' step='1' placeholder='e.g. 120'>
            </div>
          </div>
        </div>
      `;
    };

    if (state.openingsSame) {
      host.innerHTML = pair('all', 'All openings');
      wireOpeningInputs(['all_h', 'all_w']);
    } else {
      host.innerHTML = Array.from({ length: count }, (_, index) => pair(`o${index + 1}`, `Opening ${index + 1}`)).join('');
      const keys = [];
      for (let index = 1; index <= count; index += 1) keys.push(`o${index}_h`, `o${index}_w`);
      wireOpeningInputs(keys);
    }

    const validation = validateOpenings();
    setInlineHint(validation.ok ? '' : validation.msg);
  }

  function renderBaseExisting() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'slab', tag: 'Already there', title: 'Existing slab', desc: 'Use this if the enclosure will sit on an existing slab.', bg: CARD_BG.soft })}
        ${choiceCard({ key: 'pavers', tag: 'Already there', title: 'Existing pavers', desc: 'Use this if the enclosure will sit on existing pavers.', bg: CARD_BG.warm })}
        ${choiceCard({ key: 'none', tag: 'Need to add it', title: 'No, we need to add it', desc: 'Add slab or pavers as part of the enclosure project.', bg: CARD_BG.blue })}
      </div>
    `;

    wireChoiceGroup('_existingBase', ['slab', 'pavers', 'none'], (value) => {
      state.existingBase = value;
      state.newBaseType = null;
      state.existingFooting = null;
      state.footingPermitted = null;
      syncNav();
    }, () => state.existingBase);
  }

  function renderNewBaseType() {
    const area = roofAreaForInstall();
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'slab', tag: 'Surface option', title: 'Add slab', desc: area > 350 ? 'Adds slab work. Most enclosures this size also need a footing.' : 'Adds new slab under the enclosure.', bg: CARD_BG.soft })}
        ${choiceCard({ key: 'pavers', tag: 'Surface option', title: 'Add pavers', desc: 'Adds pavers. Paver installs need a footing for the enclosure.', bg: CARD_BG.warm })}
      </div>
    `;

    wireChoiceGroup('_newBaseType', ['slab', 'pavers'], (value) => {
      state.newBaseType = value;
      syncNav();
    }, () => state.newBaseType);
  }

  function renderExistingFooting() {
    const isPavers = state.existingBase === 'pavers';
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'yes', tag: 'Footing in place', title: 'Yes', desc: isPavers ? 'The pavers already have a footing for the enclosure.' : 'The slab already has a footing for the enclosure.', bg: CARD_BG.teal })}
        ${choiceCard({ key: 'no', tag: 'Needs footing', title: 'No', desc: isPavers ? 'We will need to add footing work for the enclosure.' : 'We will need to add footing work for the enclosure.', bg: CARD_BG.warm })}
      </div>
    `;

    wireChoiceGroup('_existingFooting', ['yes', 'no'], (value) => {
      state.existingFooting = value === 'yes';
      if (!state.existingFooting) state.footingPermitted = null;
      syncNav();
    }, () => {
      if (state.existingFooting === null) return null;
      return state.existingFooting ? 'yes' : 'no';
    });
  }

  function renderFootingPermitted() {
    bodyEl.innerHTML = `
      <div class='estq-grid'>
        ${choiceCard({ key: 'yes', tag: 'Permit on file', title: 'Yes', desc: 'The footing was permitted and should be tied to the property record.', bg: CARD_BG.teal })}
        ${choiceCard({ key: 'no', tag: 'Needs review', title: 'No', desc: 'The footing was not permitted or you are not sure.', bg: CARD_BG.warm })}
      </div>
    `;

    wireChoiceGroup('_footingPermitted', ['yes', 'no'], (value) => {
      state.footingPermitted = value === 'yes';
      syncNav();
    }, () => {
      if (state.footingPermitted === null) return null;
      return state.footingPermitted ? 'yes' : 'no';
    });
  }

  function renderPermitInfo() {
    bodyEl.innerHTML = `
      <div class='estq-stack'>
        <div class='estq-message'>
          <h3>Existing footing needs permit confirmation</h3>
          <p>To pull a permit for the enclosure, the footing needs to be permitted. Reach out to us if you have any questions and we will walk you through it.</p>
          <div class='estq-actions'>
            <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead>Request on-site quote</button>
            ${contactLinkHtml()}
          </div>
        </div>
      </div>
    `;
  }

  function renderDone() {
    const lines = buildReviewLines();
    bodyEl.innerHTML = `
      <div class='estq-stack'>
        <div class='estq-message'>
          <h3>Ready to send</h3>
          <ul class='estq-list'>
            ${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join('') || '<li>Add a few project details to populate the review.</li>'}
          </ul>
          <p>If the estimate looks right, you can request an on-site quote and we will reach out.</p>
          <div class='estq-actions'>
            <button class='estq-btn estq-btn--primary' type='button' data-estq-open-lead>Request on-site quote</button>
            ${contactLinkHtml()}
          </div>
        </div>
      </div>
    `;
  }

  function renderLeadForm() {
    const lines = buildReviewLines();
    const validation = validateLead();
    const leadCopy = state.enclosureType === 'glass'
      ? 'Leave your name and phone number and we will reach out about the glass enclosure layout and the next step.'
      : 'If the estimate looks right, leave your name and phone number and we will reach out to schedule the next step.';
    bodyEl.innerHTML = `
      <div class='estq-stack'>
        <div class='estq-message'>
          <h3>Request an on-site quote</h3>
          <p>${leadCopy}</p>
        </div>

        <div class='estq-fields'>
          <div class='estq-row'>
            <div>
              <label class='estq-label' for='estqLeadName'>Name</label>
              <input id='estqLeadName' class='estq-input' type='text' maxlength='120' placeholder='Your name'>
            </div>
            <div>
              <label class='estq-label' for='estqLeadPhone'>Phone number</label>
              <input id='estqLeadPhone' class='estq-input' type='tel' inputmode='tel' maxlength='40' placeholder='(904) 555-1234'>
            </div>
          </div>
        </div>

        <div id='estqInlineHint'></div>

        <div class='estq-message'>
          <h3>What we will receive</h3>
          <ul class='estq-list'>
            ${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join('') || '<li>Your current estimate selections.</li>'}
          </ul>
        </div>

        ${state.leadResponseHtml ? `<div class='estq-submit-response'>${state.leadResponseHtml}</div>` : ''}
      </div>
    `;

    const nameInput = document.getElementById('estqLeadName');
    const phoneInput = document.getElementById('estqLeadPhone');

    nameInput.value = state.leadName || '';
    phoneInput.value = state.leadPhone || '';
    nameInput.disabled = !!state.leadSubmitted;
    phoneInput.disabled = !!state.leadSubmitted;

    nameInput.addEventListener('input', () => {
      state.leadName = nameInput.value;
      state.leadResponseHtml = '';
      syncNav({ rerenderStep: false });
    });

    phoneInput.addEventListener('input', () => {
      state.leadPhone = phoneInput.value;
      state.leadResponseHtml = '';
      syncNav({ rerenderStep: false });
    });

    setInlineHint(!validation.ok && (state.leadName || state.leadPhone) ? validation.msg : '');
  }

  function validateLead() {
    const missing = [];
    if (!state.leadName || !state.leadName.trim()) missing.push('name');
    if (!state.leadPhone || !state.leadPhone.trim()) missing.push('phone number');
    return missing.length
      ? { ok: false, msg: `Enter your ${missing.join(' and ')}.` }
      : { ok: true, msg: '' };
  }

  async function submitLead() {
    const validation = validateLead();
    if (!validation.ok) {
      state.leadResponseHtml = `<div class='alert alert-danger'>${escapeHtml(validation.msg)}</div>`;
      syncNav();
      return;
    }

    state.leadSubmitting = true;
    state.leadResponseHtml = '';
    state.leadSubmitted = false;
    syncNav({ rerenderStep: false });

    const payload = new URLSearchParams();
    const quote = quoteState();
    payload.set('name', state.leadName.trim());
    payload.set('phone', state.leadPhone.trim());
    payload.set('service', submissionServiceLabel());
    payload.set('source', 'Estimate Tool');
    payload.set('comments', `Estimated price: ${quote.amount}`);
    payload.set('estimate_details', buildEstimateEmailDetails());

    try {
      const response = await fetch('assets/mail/contactArt.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: payload.toString()
      });

      const html = await response.text();
      const sentOk = response.ok && /alert-success/i.test(html);
      state.leadResponseHtml = html || `<div class='alert alert-danger'>Error processing request.</div>`;
      state.leadSubmitted = sentOk;
      if (sentOk && window.trackLeadConversion) {
        window.trackLeadConversion({ source: 'estimate_tool', leadType: 'estimate_request', service: submissionServiceLabel() });
      }
    } catch (error) {
      state.leadSubmitted = false;
      state.leadResponseHtml = `<div class='alert alert-danger'>Error processing request.</div>`;
    } finally {
      state.leadSubmitting = false;
      syncNav();
    }
  }

  function submissionServiceLabel() {
    if (state.serviceType === 'repair') {
      if (state.repairType) return prettyRepairType(state.repairType) || prettyServiceType(state.serviceType);
      return prettyServiceType(state.serviceType);
    }

    if (state.enclosureType) return prettyType(state.enclosureType) || prettyServiceType(state.serviceType);
    return prettyServiceType(state.serviceType) || 'Estimate request';
  }

  function buildEstimateEmailDetails() {
    const quote = quoteState();
    const lines = buildSummaryLines();
    return [
      `Estimate status: ${quote.label}`,
      `Estimate amount: ${quote.amount}`,
      `Estimate note: ${quote.note}`,
      '',
      ...lines
    ].join('\n');
  }

  function buildReviewLines() {
    const quote = quoteState();
    return [...buildSummaryLines(), `Estimated price: ${quote.amount}`];
  }

  function rolldownInfoDisclosure() {
    return `
      <details class='estq-disclosure'>
        <summary>About MaestroShield and warranty coverage</summary>
        <div class='estq-disclosure__body'>
          <p>MaestroShield has been building retractable screen and shutter systems in Fort Myers, Florida since 2005. Their products are designed and manufactured in the USA, and we install them as an authorized dealer.</p>
          <div class='estq-disclosure__chips'>
            <span class='estq-disclosure__chip'>Made in the USA</span>
            <span class='estq-disclosure__chip'>Since 2005</span>
            <span class='estq-disclosure__chip'>Authorized dealer</span>
          </div>
          <p>The systems are built around adjustable aluminum tracks, durable components, and long-running motor platforms made for smooth daily use with low maintenance.</p>
          <ul class='estq-disclosure__list'>
            <li>Electronics: Full 2 Year 100% Replacement Warranty.</li>
            <li>Manual gears, universals, mounting plates, idlers, spring blocks, crown and drive gears, brush seals, gaskets, and plastic parts: Full 2 Year Replacement Warranty.</li>
            <li>Tubular motors with built-in receivers: Full 3 Year 100% Replacement Warranty.</li>
            <li>All other tubular motors: Full 5 Year 100% Replacement Warranty.</li>
          </ul>
        </div>
      </details>
    `;
  }
  function contactLinkHtml() {
    return `<a class='estq-btn estq-btn--ghost estq-contact-desktop' href='${CONTACT_URL}'>Contact us</a><a class='estq-btn estq-btn--ghost estq-contact-mobile' href='${CALL_URL}'>Call now</a>`;
  }

  function choiceCard({ key, title, desc, bg = CARD_BG.blue, tag = '' }) {
    const style = [`--estq-card-bg:${bg}`].join(';');
    return `
      <button class='estq-choice' type='button' data-choice='${escapeHtml(key)}' aria-pressed='false' style='${style}'>
        <span class='estq-choice__check' aria-hidden='true'><i class='fas fa-check'></i></span>
        <div class='estq-choice__body'>
          ${tag ? `<div class='estq-choice__top'><span class='estq-choice__tag'>${escapeHtml(tag)}</span></div>` : ''}
          <div class='estq-choice__title'>${escapeHtml(title)}</div>
          <div class='estq-choice__desc'>${escapeHtml(desc)}</div>
        </div>
      </button>
    `;
  }
  function numberField(id, label, placeholder) {
    return `
      <div>
        <label class='estq-label' for='${id}'>${label}</label>
        <input id='${id}' class='estq-input' type='number' inputmode='decimal' min='0' step='0.5' placeholder='${placeholder}'>
      </div>
    `;
  }

  function wireChoiceGroup(stateKey, keys, onPick, getCurrent = null) {
    const buttons = Array.from(bodyEl.querySelectorAll('[data-choice]'));
    const current = getCurrent ? getCurrent() : state[stateKey];
    buttons.forEach((button) => {
      const key = button.getAttribute('data-choice');
      button.setAttribute('aria-pressed', String(current) === String(key) ? 'true' : 'false');
      button.addEventListener('click', () => {
        buttons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        onPick(key);
      });
    });
  }

  function wireOpeningInputs(keys) {
    keys.forEach((key) => {
      const input = document.getElementById(key);
      if (!input) return;
      input.value = state.dims[key] ?? '';
      input.addEventListener('input', () => {
        const value = input.value.trim();
        state.dims[key] = value === '' ? '' : Number(value);
        syncNav({ rerenderStep: false });
      });
    });
  }

  function dimsFieldsForWalls(count) {
    if (count === 1 && state.enclosureType === 'house') return [{ key: 'width', label: 'Front wall width (ft)', placeholder: 'e.g. 20' }];
    if (count === 1) return [{ key: 'width', label: 'Front wall width (ft)', placeholder: 'e.g. 20' }, { key: 'projection', label: 'Projection / depth (ft)', placeholder: 'e.g. 14' }];
    if (count === 2) return [{ key: 'front', label: 'Front wall length (ft)', placeholder: 'e.g. 20' }, { key: 'side1', label: 'Side wall length (ft)', placeholder: 'e.g. 14' }];
    if (count === 3) return [{ key: 'front', label: 'Front wall length (ft)', placeholder: 'e.g. 20' }, { key: 'side1', label: 'Side wall 1 length (ft)', placeholder: 'e.g. 14' }, { key: 'side2', label: 'Side wall 2 length (ft)', placeholder: 'e.g. 14' }];
    if (count === 4) return [{ key: 'front', label: 'Front wall length (ft)', placeholder: 'e.g. 20' }, { key: 'side1', label: 'Side wall 1 length (ft)', placeholder: 'e.g. 14' }, { key: 'side2', label: 'Side wall 2 length (ft)', placeholder: 'e.g. 14' }, { key: 'back', label: 'Back wall length (ft)', placeholder: 'e.g. 20' }];
    return [];
  }

  function validateDimsForWalls() {
    const fields = dimsFieldsForWalls(state.screenWalls);
    if (!fields.length) return { ok: false, msg: 'Select the number of screen walls first.' };
    const height = state.dims.wallHeight;
    if (!(typeof height === 'number') || !isFinite(height) || height <= 0) return { ok: false, msg: 'Enter the wall height.' };
    const missing = [];
    fields.forEach((field) => {
      const value = state.dims[field.key];
      if (!(typeof value === 'number') || !isFinite(value) || value <= 0) missing.push(field.label.replace(' (ft)', ''));
    });
    return missing.length ? { ok: false, msg: missing.join(', ') } : { ok: true, msg: '' };
  }

  function validateOpenings() {
    if (!Number.isInteger(state.rolldownCount)) return { ok: false, msg: 'Select the rolldown quantity first.' };
    const missing = [];
    if (state.openingsSame) {
      if (!(typeof state.dims.all_h === 'number') || state.dims.all_h <= 0) missing.push('All openings height');
      if (!(typeof state.dims.all_w === 'number') || state.dims.all_w <= 0) missing.push('All openings width');
    } else {
      for (let index = 1; index <= state.rolldownCount; index += 1) {
        if (!(typeof state.dims[`o${index}_h`] === 'number') || state.dims[`o${index}_h`] <= 0) missing.push(`Opening ${index} height`);
        if (!(typeof state.dims[`o${index}_w`] === 'number') || state.dims[`o${index}_w`] <= 0) missing.push(`Opening ${index} width`);
      }
    }
    return missing.length ? { ok: false, msg: missing.join(', ') } : { ok: true, msg: '' };
  }

  function validateScreenReplaceMeasurements() {
    const count = state.wallCount;
    if (!Number.isInteger(count) || count < 1 || count > 4) return { ok: false, msg: 'Choose between 1 and 4 walls.' };
    if (!(typeof state.wallHeight === 'number') || !isFinite(state.wallHeight) || state.wallHeight <= 0) return { ok: false, msg: 'Enter the wall height.' };
    const widths = state.wallWidths ?? [];
    for (let index = 0; index < count; index += 1) {
      const value = widths[index];
      if (!(typeof value === 'number') || !isFinite(value) || value <= 0) return { ok: false, msg: `Enter wall ${index + 1} width.` };
    }
    return { ok: true, msg: '' };
  }

  function inlineHintHtml(message) {
    return message
      ? `<div class='estq-alert estq-alert--warn'><div><strong>Still needed</strong></div><div class='estq-note'>${escapeHtml(message)}</div></div>`
      : '';
  }

  function setInlineHint(message = '') {
    const host = document.getElementById('estqInlineHint');
    if (!host) return;
    host.innerHTML = inlineHintHtml(message);
  }

  function refreshActiveInlineHint() {
    const flow = getFlow();
    const step = flow[stepIndex];
    if (!step) return;

    if (step.id === 'measurements') {
      const validation = validateScreenReplaceMeasurements();
      setInlineHint(validation.ok ? '' : validation.msg);
      return;
    }

    if (step.id === 'size') {
      const validation = validateDimsForWalls();
      setInlineHint(validation.ok ? '' : validation.msg);
      return;
    }

    if (step.id === 'openings') {
      const validation = validateOpenings();
      setInlineHint(validation.ok ? '' : validation.msg);
      return;
    }

    if (step.id === 'lead') {
      const validation = validateLead();
      setInlineHint(!validation.ok && (state.leadName || state.leadPhone) ? validation.msg : '');
      return;
    }

    setInlineHint('');
  }

  function roofAreaForInstall() {
    return roofFootprintArea();
  }

  function wallHeightForInstall() {
    return Number(state.dims.wallHeight || 0);
  }

  function footprintDimensions() {
    const count = state.screenWalls;
    const dims = state.dims;
    if (count === 1) return { span: Number(dims.width || 0), depth: Number(dims.projection || 0) };
    if (count === 2) return { span: Number(dims.front || 0), depth: Number(dims.side1 || 0) };
    if (count === 3) return { span: Number(dims.front || 0), depth: average(dims.side1 || 0, dims.side2 || 0) };
    if (count === 4) return { span: average(dims.front || 0, dims.back || 0), depth: average(dims.side1 || 0, dims.side2 || 0) };
    return { span: 0, depth: 0 };
  }

  function roofFootprintArea() {
    const footprint = footprintDimensions();
    return footprint.span * footprint.depth;
  }

  function roofAreaWithOverhang() {
    const footprint = footprintDimensions();
    if (footprint.span <= 0 || footprint.depth <= 0) return 0;
    return (footprint.span + 2) * (footprint.depth + 1);
  }

  function totalWallLength() {
    const count = state.screenWalls;
    const dims = state.dims;
    if (count === 1) return Number(dims.width || 0);
    if (count === 2) return Number(dims.front || 0) + Number(dims.side1 || 0);
    if (count === 3) return Number(dims.front || 0) + Number(dims.side1 || 0) + Number(dims.side2 || 0);
    if (count === 4) return Number(dims.front || 0) + Number(dims.side1 || 0) + Number(dims.side2 || 0) + Number(dims.back || 0);
    return 0;
  }

  function installWallArea() {
    return totalWallLength() * wallHeightForInstall();
  }

  function installKickplateCost() {
    return state.kickplate ? totalWallLength() * PRICING.install.kickPlateLinearFt : 0;
  }

  function prettyExistingBase(value) {
    if (value === 'slab') return 'Existing slab';
    if (value === 'pavers') return 'Existing pavers';
    if (value === 'none') return 'No slab or pavers yet';
    return '';
  }

  function prettyNewBaseType(value) {
    return value === 'pavers' ? 'Add pavers' : value === 'slab' ? 'Add slab' : '';
  }

  function baseWorkStatus() {
    if (!['solid', 'screen'].includes(state.enclosureType)) return { ok: true, msg: '' };
    if (!validateDimsForWalls().ok) return { ok: false, msg: 'Add dimensions first.' };
    const area = roofAreaForInstall();

    if (!state.existingBase) return { ok: false, msg: 'Choose whether slab or pavers already exist.' };
    if (state.existingBase === 'none' && !state.newBaseType) return { ok: false, msg: 'Choose whether to add slab or pavers.' };

    if (state.existingBase === 'slab' && area > 350) {
      if (state.existingFooting === null) return { ok: false, msg: 'Tell us whether the slab already has a footing.' };
      if (state.existingFooting === true && state.footingPermitted === null) return { ok: false, msg: 'Tell us whether the footing was permitted.' };
    }

    if (state.existingBase === 'pavers' && state.existingFooting === null) {
      return { ok: false, msg: 'Tell us whether the pavers already have a footing.' };
    }

    return { ok: true, msg: '' };
  }

  function installBaseWorkCost() {
    const area = roofAreaForInstall();
    const wallLength = totalWallLength();
    const surfacePricing = PRICING.install.surfaces;

    if (state.existingBase === 'none') {
      if (state.newBaseType === 'slab') {
        return area > 350
          ? Math.max(area * surfacePricing.slabWithFootingSqFt, surfacePricing.footingMin)
          : Math.max(area * surfacePricing.slabSqFt, surfacePricing.slabMin);
      }
      if (state.newBaseType === 'pavers') {
        return (area * surfacePricing.paversSqFt) + Math.max(wallLength * surfacePricing.paverFootingLinearFt, surfacePricing.footingMin);
      }
    }

    if (state.existingBase === 'slab') {
      if (area > 350 && state.existingFooting === false) {
        return Math.max(wallLength * surfacePricing.slabFootingLinearFt, surfacePricing.footingMin);
      }
      return 0;
    }

    if (state.existingBase === 'pavers') {
      if (state.existingFooting === false) {
        return Math.max(wallLength * surfacePricing.paverFootingLinearFt, surfacePricing.footingMin);
      }
      return 0;
    }

    return 0;
  }

  function installFoundationSummaryItem() {
    if (!baseWorkStatus().ok) return null;
    const cost = installBaseWorkCost();
    if (cost <= 0) return null;

    if (state.existingBase === 'none' && state.newBaseType === 'slab') {
      return { k: roofAreaForInstall() > 350 ? 'Slab and footing' : 'Slab', v: money(cost) };
    }

    if (state.existingBase === 'none' && state.newBaseType === 'pavers') {
      return { k: 'Pavers and footing', v: money(cost) };
    }

    if (state.existingBase === 'slab' && state.existingFooting === false) {
      return { k: 'Footing', v: money(cost) };
    }

    if (state.existingBase === 'pavers' && state.existingFooting === false) {
      return { k: 'Footing', v: money(cost) };
    }

    return null;
  }

  function installFoundationNote() {
    const area = roofAreaForInstall();

    if (state.existingBase === 'none' && state.newBaseType === 'slab') {
      return area > 350
        ? 'Includes new slab and footing because most enclosures this size need a footing.'
        : 'Includes new slab.';
    }

    if (state.existingBase === 'none' && state.newBaseType === 'pavers') {
      return 'Includes pavers and footing. Pavers require a footing for the enclosure.';
    }

    if (state.existingBase === 'slab') {
      if (area > 350 && state.existingFooting === false) {
        return 'Includes new footing because most enclosures this size need one.';
      }
      if (area > 350 && state.existingFooting === true && state.footingPermitted === false) {
        return 'Existing footing needs permit confirmation before the enclosure permit can be pulled.';
      }
      return 'Existing slab is assumed usable for the enclosure.';
    }

    if (state.existingBase === 'pavers') {
      return state.existingFooting === false
        ? 'Includes footing work because pavers require a footing for the enclosure.'
        : 'Existing pavers and footing are assumed usable for the enclosure.';
    }

    return '';
  }

  function resetRepairBranch() {
    state.repairType = null;
    state.mesh = null;
    state.roofType = null;
    state.wallCount = null;
    state.wallsSame = true;
    state.wallWidths = [];
    state.wallHeight = null;
    state.stainless = null;
    state.limitContact = false;
  }

  function resetInstallBranch() {
    state.enclosureType = null;
    state.solidRoofType = null;
    state.screenWalls = null;
    state.kickplate = null;
    state.dims = {};
    state.nearBeach = null;
    state.beachOverride = false;
    state.rolldownCount = null;
    state.openingsSame = true;
    state.existingBase = null;
    state.newBaseType = null;
    state.existingFooting = null;
    state.footingPermitted = null;
  }

  function renderSummary() {
    const items = buildSummaryItems();

    summaryGridEl.innerHTML = items.length
      ? items.map((item) => `
        <div class='estq-summary-item'>
          <div class='estq-summary-item__label'>${escapeHtml(item.k)}</div>
          <div class='estq-summary-item__value'>${escapeHtml(item.v)}</div>
        </div>
      `).join('')
      : `<div class='estq-empty'>Choose a project type to start. Your selections update here as you go.</div>`;

    if (mobileSummaryGridEl) {
      mobileSummaryGridEl.innerHTML = items.length
        ? items.map((item) => `
          <div class='estq-mobile-summary__item'>
            <div class='estq-mobile-summary__item-label'>${escapeHtml(item.k)}</div>
            <div class='estq-mobile-summary__item-value'>${escapeHtml(item.v)}</div>
          </div>
        `).join('')
        : `<div class='estq-mobile-summary__empty'>Choose a project type to start.</div>`;
    }

    const quote = quoteState();
    quoteLabelEl.textContent = quote.label;
    quoteBadgeEl.className = quote.badgeClass;
    quoteBadgeEl.textContent = quote.badge;
    quoteAmountEl.textContent = quote.amount;
    quoteNoteEl.textContent = quote.note;
    quoteFineEl.textContent = quote.fine;

    if (mobileBadgeEl) {
      mobileBadgeEl.className = quote.badgeClass;
      mobileBadgeEl.textContent = quote.badge;
    }
    if (mobileAmountEl) mobileAmountEl.textContent = quote.amount;
    if (mobileLabelEl) mobileLabelEl.textContent = quote.label;
    if (mobileNoteEl) mobileNoteEl.textContent = quote.note;
    root.querySelectorAll('[data-estq-open-lead-static]').forEach((button) => {
      button.disabled = !state.serviceType;
      button.setAttribute('aria-disabled', String(!state.serviceType));
      button.style.opacity = state.serviceType ? '1' : '0.55';
    });
    setMobileSummaryOpen(mobileSummaryOpen);
  }
  function buildSummaryItems() {
    const items = [];
    if (state.serviceType) items.push({ k: 'Project', v: prettyServiceType(state.serviceType) });

    if (state.serviceType === 'repair') {
      if (state.repairType) items.push({ k: 'Scope', v: prettyRepairType(state.repairType) });
      if (state.repairType === 'screenReplace') {
        if (state.mesh) items.push({ k: 'Mesh', v: prettyMesh(state.mesh) });
        if (state.roofType) items.push({ k: 'Roof', v: prettyRoofType(state.roofType) });
        if (state.wallCount) items.push({ k: 'Walls', v: state.wallCount === 'more' ? 'More than 4 walls' : `${state.wallCount} wall${state.wallCount === 1 ? '' : 's'}` });
        const size = screenReplaceLine();
        if (size) items.push({ k: 'Approx. size (ft)', v: size });
        if (state.stainless !== null) items.push({ k: 'Replace fasteners and tapcons', v: state.stainless ? 'Yes, with stainless' : 'No' });
      }
    }

    if (state.serviceType === 'install') {
      if (state.enclosureType) items.push({ k: 'System', v: prettyType(state.enclosureType) });
      if (state.enclosureType === 'glass') items.push({ k: 'Guide pricing', v: glassGuideLine() });
      if (state.enclosureType === 'solid' && state.solidRoofType) items.push({ k: 'Solid roof type', v: prettySolidRoofType(state.solidRoofType) });
      if (['solid', 'screen', 'house'].includes(state.enclosureType)) {
        if (state.screenWalls) items.push({ k: 'Screen walls', v: `${state.screenWalls}` });
        const dimensions = dimsLineForWalls();
        if (dimensions) items.push({ k: 'Approx. size (ft)', v: dimensions });
        if (state.kickplate !== null) items.push({ k: 'Kick plate', v: state.kickplate ? money(installKickplateCost()) : 'No' });
      }
      if (['solid', 'screen'].includes(state.enclosureType)) {
        if (state.existingBase) items.push({ k: 'Current surface', v: prettyExistingBase(state.existingBase) });
        if (state.existingBase === 'none' && state.newBaseType) items.push({ k: 'Add surface', v: prettyNewBaseType(state.newBaseType) });
        if (state.existingBase === 'slab' && roofAreaForInstall() > 350) {
          if (state.existingFooting !== null) items.push({ k: 'Existing footing', v: state.existingFooting ? 'Yes' : 'No' });
          if (state.existingFooting && state.footingPermitted !== null) items.push({ k: 'Footing permitted', v: state.footingPermitted ? 'Yes' : 'No' });
        }
        if (state.existingBase === 'pavers' && state.existingFooting !== null) {
          items.push({ k: 'Existing footing', v: state.existingFooting ? 'Yes' : 'No' });
        }
        const foundationItem = installFoundationSummaryItem();
        if (foundationItem) items.push(foundationItem);
      }
      if (state.enclosureType === 'rolldown') {
        if (state.nearBeach !== null) items.push({ k: 'Wind exposure', v: state.nearBeach ? 'Near beach / high wind' : 'Standard inland conditions' });
        if (state.rolldownCount) items.push({ k: 'Openings', v: `${state.rolldownCount} opening${state.rolldownCount === 1 ? '' : 's'}` });
        const openings = openingsLine();
        if (openings) items.push({ k: 'Opening sizes', v: openings });
      }
    }

    return items;
  }

  function quoteState() {
    if (!state.serviceType) {
      return {
        label: 'Estimate',
        badge: 'Start',
        badgeClass: 'estq-badge estq-badge--pending',
        amount: 'Choose a project type',
        note: 'Answer a few questions to see an estimated price or next step.',
        fine: 'Online estimate only. Final price may change after field measurements, permit requirements, and site conditions.'
      };
    }
    if (state.serviceType === 'repair') return repairQuoteState();
    return installQuoteState();
  }

  function repairQuoteState() {
    if (!state.repairType) {
      return {
        label: 'Repair estimate',
        badge: 'Pending',
        badgeClass: 'estq-badge estq-badge--pending',
        amount: 'Choose the repair type',
        note: 'Some repair jobs can be priced online. Others need photos or a quick review.',
        fine: 'Online estimate only. Final price may change after photos, field measurements, and site conditions.'
      };
    }
    if (state.repairType === 'hardware') {
      return {
        label: 'Repair pricing',
        badge: 'Guide',
        badgeClass: 'estq-badge estq-badge--manual',
        amount: `From ${money(PRICING.repair.hardwareStart)}`,
        note: 'Common hardware repairs start with a service visit and confirmed parts.',
        fine: 'Online estimate only. Final price depends on the exact parts and labor needed.'
      };
    }
    if (state.repairType === 'structural') {
      return {
        label: 'Next step',
        badge: 'Review needed',
        badgeClass: 'estq-badge estq-badge--manual',
        amount: 'Photos or site review',
        note: 'Bent framing, storm damage, and rebuild work need a manual review before pricing.',
        fine: 'Reach out with photos and we will tell you the next step.'
      };
    }
    if (!state.mesh || !state.roofType || state.wallCount === null) {
      return {
        label: 'Screen replacement',
        badge: 'Pending',
        badgeClass: 'estq-badge estq-badge--pending',
        amount: 'Add project details',
        note: 'Choose mesh, roof type, and wall count to unlock the estimate.',
        fine: 'Rough measurements in feet are enough for this stage.'
      };
    }
    if (state.wallCount === 'more') {
      return {
        label: 'Custom screen layout',
        badge: 'Review needed',
        badgeClass: 'estq-badge estq-badge--manual',
        amount: 'Manual quote',
        note: 'Large or unusual layouts need a custom review instead of automatic pricing.',
        fine: 'Photos or a sketch help us quote it correctly.'
      };
    }
    if (!validateScreenReplaceMeasurements().ok) {
      return {
        label: 'Screen replacement',
        badge: 'Pending',
        badgeClass: 'estq-badge estq-badge--pending',
        amount: 'Add measurements',
        note: 'Enter rough wall width and height to see the estimate.',
        fine: 'Online estimate only. Final price may change after field measurements and site conditions.'
      };
    }
    const base = calcScreenReplaceBase();
    return {
      label: 'Estimated price',
      badge: 'Live',
      badgeClass: 'estq-badge estq-badge--live',
      amount: money(base),
      note: 'Based on ' + prettyMesh(state.mesh) + ' mesh, ' + prettyRoofType(state.roofType) + ', and the measurements you entered.',
      fine: 'Online estimate only. Final price may change with framing condition, access, and field measurements.'
    };
  }

  function installQuoteState() {
    if (!state.enclosureType) {
      return {
        label: 'New project estimate',
        badge: 'Pending',
        badgeClass: 'estq-badge estq-badge--pending',
        amount: 'Choose a system',
        note: 'Pick the system to start the right pricing path.',
        fine: 'Online estimate only. Final price may change after field measurements, permit requirements, and site conditions.'
      };
    }

    if (state.enclosureType === 'glass') {
      return {
        label: 'Next step',
        badge: 'Manual quote',
        badgeClass: 'estq-badge estq-badge--manual',
        amount: 'Guide pricing only',
        note: 'Glass enclosures are site-specific. Expect roughly $1,200 per door, $1,000 per window, and about $1,000 for the enclosure frame.',
        fine: 'Engineering and permitting commonly add about $500 depending on the size and county. Request an on-site quote for the real number.'
      };
    }

    if (state.enclosureType === 'solid' && !state.solidRoofType) {
      return {
        label: 'Estimated price',
        badge: 'Pending',
        badgeClass: 'estq-badge estq-badge--pending',
        amount: 'Choose the solid roof type',
        note: 'Roof type changes the solid-roof pricing.',
        fine: 'After that, add wall count and dimensions to see the estimate.'
      };
    }

    if (['solid', 'screen', 'house'].includes(state.enclosureType)) {
      if (!state.screenWalls) {
        return {
          label: 'Estimated price',
          badge: 'Pending',
          badgeClass: 'estq-badge estq-badge--pending',
          amount: 'Choose wall count',
          note: 'Wall count changes the wall area and final price.',
          fine: 'After that, enter rough dimensions to see the estimate.'
        };
      }
      if (!validateDimsForWalls().ok) {
        return {
          label: 'Estimated price',
          badge: 'Pending',
          badgeClass: 'estq-badge estq-badge--pending',
          amount: 'Add dimensions',
          note: 'Enter wall lengths and one wall height in feet to unlock the estimate.',
          fine: 'Online estimate only. Final price may change after field measurements, permit requirements, and site conditions.'
        };
      }
      if (state.kickplate === null) {
        return {
          label: 'Estimated price',
          badge: 'Pending',
          badgeClass: 'estq-badge estq-badge--pending',
          amount: 'Choose kick plate',
          note: 'Tell us whether to include kick plate on the walls.',
          fine: 'That lets us finish the wall pricing.'
        };
      }
    }

    if (['solid', 'screen'].includes(state.enclosureType)) {
      const baseStatus = baseWorkStatus();
      if (!baseStatus.ok) {
        return {
          label: 'Estimated price',
          badge: 'Pending',
          badgeClass: 'estq-badge estq-badge--pending',
          amount: 'Add slab / paver info',
          note: baseStatus.msg,
          fine: 'Slab, pavers, and footing work can change the final estimate.'
        };
      }

      const price = calcInstallBase();
      const roofText = state.enclosureType === 'solid' ? prettySolidRoofType(state.solidRoofType).toLowerCase() : 'screen roof';
      const kickplateText = state.kickplate ? ' Includes kick plate.' : '';
      return {
        label: 'Estimated price',
        badge: 'Live',
        badgeClass: 'estq-badge estq-badge--live',
        amount: money(price),
        note: ('Based on ' + state.screenWalls + ' screen wall' + (state.screenWalls === 1 ? '' : 's') + ' and a ' + roofText + '.' + kickplateText + ' ' + installFoundationNote()).trim(),
        fine: state.existingBase === 'slab' && roofAreaForInstall() > 350 && state.existingFooting === true && state.footingPermitted === false ? 'Online estimate only. Existing footing needs permit confirmation before the enclosure permit can be pulled.' : 'Online estimate only. Final price may change after field measurements, permit requirements, and site conditions.'
      };
    }

    if (state.enclosureType === 'house') {
      const price = calcInstallBase();
      return {
        label: 'Estimated price',
        badge: 'Live',
        badgeClass: 'estq-badge estq-badge--live',
        amount: money(price),
        note: 'Based on ' + state.screenWalls + ' screen wall' + (state.screenWalls === 1 ? '' : 's') + ' under the existing house roof.' + (state.kickplate ? ' Includes kick plate.' : ''),
        fine: 'Online estimate only. Final price may change after field measurements, tie-in details, and site conditions.'
      };
    }

    if (state.enclosureType === 'rolldown') {
      if (state.nearBeach === true && !state.beachOverride) {
        return {
          label: 'Rolldown system',
          badge: 'Review needed',
          badgeClass: 'estq-badge estq-badge--manual',
          amount: 'Wind-zone review',
          note: 'Beach and high-wind projects may need a different product and price.',
          fine: 'You can still continue if you want a rough starting price.'
        };
      }
      if (!state.rolldownCount) {
        return {
          label: 'Rolldown estimate',
          badge: 'Pending',
          badgeClass: 'estq-badge estq-badge--pending',
          amount: 'Choose opening count',
          note: 'Start with the number of openings.',
          fine: 'Opening sizes tighten the estimate.'
        };
      }
      if (!validateOpenings().ok) {
        return {
          label: 'Rolldown estimate',
          badge: 'Pending',
          badgeClass: 'estq-badge estq-badge--pending',
          amount: 'Add opening sizes',
          note: 'Enter rough height and width for each opening to see the estimate.',
          fine: 'Width, height, and wind exposure can change the final price.'
        };
      }
      const base = calcRolldownBase();
      return {
        label: 'Estimated price',
        badge: 'Live',
        badgeClass: 'estq-badge estq-badge--live',
        amount: money(base),
        note: 'Based on ' + state.rolldownCount + ' opening' + (state.rolldownCount === 1 ? '' : 's') + ' and the sizes you entered.',
        fine: 'Online estimate only. Final price may change with motor choice, controls, mounting conditions, and wind review.'
      };
    }

    return {
      label: 'Estimate',
      badge: 'Pending',
      badgeClass: 'estq-badge estq-badge--pending',
      amount: 'Build your estimate',
      note: 'Keep answering the questions to unlock the estimate.',
      fine: 'Online estimate only. Final price may change after field measurements, permit requirements, and site conditions.'
    };
  }

  function calcScreenReplaceBase() {
    const wallArea = screenReplaceWallArea();
    const roofArea = screenReplaceRoofArea();
    const repairPricing = PRICING.repair.screen;
    const wallRate = state.mesh === '2020' ? repairPricing.wallSqFt2020 : repairPricing.wallSqFt1814;
    const roofRate = state.mesh === '2020' ? repairPricing.roofSqFt2020 : repairPricing.roofSqFt1814;
    let total = repairPricing.tripCharge + wallArea * wallRate + roofArea * roofRate;
    if (state.stainless) total *= repairPricing.stainlessMultiplier;
    return total;
  }

  function screenReplaceWallArea() {
    if (!validateScreenReplaceMeasurements().ok) return 0;
    const widths = state.wallWidths.slice(0, state.wallCount).map(roundUpFeet);
    return roundUpFeet(state.wallHeight) * widths.reduce((sum, value) => sum + value, 0);
  }

  function screenReplaceRoofArea() {
    if (state.roofType !== 'screen' || !validateScreenReplaceMeasurements().ok) return 0;
    const widths = state.wallWidths.slice(0, state.wallCount).map(roundUpFeet);
    if (state.wallCount === 1) return widths[0] * widths[0];
    if (state.wallCount === 2) return widths[0] * widths[1];
    if (state.wallCount === 3) return widths[0] * average(widths[1], widths[2]);
    if (state.wallCount === 4) return average(widths[0], widths[3]) * average(widths[1], widths[2]);
    return 0;
  }

  function calcInstallBase() {
    let total = 0;
    const installPricing = PRICING.install;

    if (['solid', 'screen', 'house'].includes(state.enclosureType)) {
      const wallCost = installWallArea() * installPricing.wallSqFt;
      const kickplateCost = installKickplateCost();

      if (state.enclosureType === 'screen') {
        total = wallCost + (roofFootprintArea() * installPricing.screenRoofSqFt) + kickplateCost;
        if (total < installPricing.enclosureMinimumThreshold) total += installPricing.enclosureMinimumAddon;
      } else if (state.enclosureType === 'solid') {
        const roofRate = state.solidRoofType === 'composite'
          ? installPricing.solidRoofSqFt.composite
          : installPricing.solidRoofSqFt.pan;
        total = wallCost + (roofAreaWithOverhang() * roofRate) + kickplateCost;
        if (total < installPricing.enclosureMinimumThreshold) total += installPricing.enclosureMinimumAddon;
      } else if (state.enclosureType === 'house') {
        total = Math.max(wallCost, installPricing.houseWallMinimum) + kickplateCost;
      }
    }

    if (['solid', 'screen'].includes(state.enclosureType)) total += installBaseWorkCost();
    return total;
  }

  function calcRolldownBase() {
    const totalArea = totalOpeningArea();
    return Math.max(totalArea * PRICING.rolldown.openingSqFt, rolldownMinimumTotal());
  }

  function rolldownMinimumPerSystem() {
    if (!state.rolldownCount) return 0;
    return state.rolldownCount >= PRICING.rolldown.highCountThreshold
      ? PRICING.rolldown.minimumPerSystemHighCount
      : PRICING.rolldown.minimumPerSystemLowCount;
  }

  function rolldownMinimumTotal() {
    if (!state.rolldownCount) return 0;
    return state.rolldownCount * rolldownMinimumPerSystem();
  }

  function totalOpeningArea() {
    if (!validateOpenings().ok) return 0;
    if (state.openingsSame) return state.rolldownCount * ((state.dims.all_h * state.dims.all_w) / 144);
    let total = 0;
    for (let index = 1; index <= state.rolldownCount; index += 1) total += (state.dims[`o${index}_h`] * state.dims[`o${index}_w`]) / 144;
    return total;
  }

  function moneyRange(minimum, maximum) {
    return `${money(minimum)} - ${money(maximum)}`;
  }

  function money(value) {
    const rounded = Math.max(0, Math.round(value));
    return `$${rounded.toLocaleString()}`;
  }

  function roughAreaForWalls() {
    return roofFootprintArea();
  }

  function roundUpFeet(value) {
    return Math.ceil(Number(value) || 0);
  }

  function average(a, b) {
    return (Number(a) + Number(b)) / 2;
  }

  function dimsLineForWalls() {
    const count = state.screenWalls;
    const dims = state.dims;
    if (!count) return '';
    const height = `Height ${dims.wallHeight || '-'} ft`;
    if (count === 1 && state.enclosureType === 'house') return `${height}, front ${dims.width || '-'} ft`;
    if (count === 1) return `${height}, front ${dims.width || '-'} ft, depth ${dims.projection || '-'} ft`;
    if (count === 2) return `${height}, front ${dims.front || '-'} ft, side ${dims.side1 || '-'} ft`;
    if (count === 3) return `${height}, front ${dims.front || '-'} ft, side 1 ${dims.side1 || '-'} ft, side 2 ${dims.side2 || '-'} ft`;
    if (count === 4) return `${height}, front ${dims.front || '-'} ft, side 1 ${dims.side1 || '-'} ft, side 2 ${dims.side2 || '-'} ft, back ${dims.back || '-'} ft`;
    return '';
  }

  function screenReplaceLine() {
    if (!Number.isInteger(state.wallCount)) return '';
    const widths = state.wallWidths.slice(0, state.wallCount).filter((value) => typeof value === 'number' && value > 0);
    if (!widths.length && !state.wallHeight) return '';
    const height = state.wallHeight ? `H ${state.wallHeight} ft` : '';
    const widthText = widths.length ? `W ${widths.join(' / ')} ft` : '';
    return [height, widthText].filter(Boolean).join(', ');
  }

  function openingsLine() {
    if (!state.rolldownCount) return '';
    if (state.openingsSame) {
      if (!(typeof state.dims.all_h === 'number') || !(typeof state.dims.all_w === 'number')) return '';
      return `${state.rolldownCount} x ${state.dims.all_h} in H x ${state.dims.all_w} in W`;
    }
    const parts = [];
    for (let index = 1; index <= state.rolldownCount; index += 1) {
      const height = state.dims[`o${index}_h`];
      const width = state.dims[`o${index}_w`];
      if (!(typeof height === 'number') || !(typeof width === 'number')) return '';
      parts.push(`#${index} ${height} in H x ${width} in W`);
    }
    return parts.join(', ');
  }

  function buildSummaryLines() {
    return buildSummaryItems().map((item) => `${item.k}: ${item.v}`);
  }

  function prettyServiceType(value) {
    return value === 'repair' ? 'Repair and replacement' : 'New install or rebuild';
  }

  function prettyRepairType(value) {
    if (value === 'hardware') return 'Hardware replacement';
    if (value === 'screenReplace') return 'Screen replacement';
    if (value === 'structural') return 'Structural repair';
    return '';
  }

  function prettyMesh(value) {
    return value === '2020' ? '20 / 20 no-see-um' : '18 / 14 screen';
  }

  function prettyRoofType(value) {
    return value === 'screen' ? 'screen roof' : 'solid roof';
  }

  function prettyType(value) {
    if (value === 'solid') return 'Solid roof enclosure';
    if (value === 'screen') return 'Screen roof enclosure';
    if (value === 'house') return 'Existing house roof';
    if (value === 'glass') return 'Glass enclosure';
    if (value === 'rolldown') return 'Electronic rolldown system';
    return '';
  }

  function glassGuideLine() {
    return 'About $1,200 per door, $1,000 per window, about $1,000 for the frame, plus about $500 for engineering and permitting depending on size and county.';
  }

  function prettySolidRoofType(value) {
    if (value === 'composite') return '3\" insulated composite roof';
    if (value === 'pan') return 'Pan roof';
    return '';
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll(String.fromCharCode(39), '&#039;');
  }

  const observer = new MutationObserver(() => {
    const flow = getFlow();
    const step = flow[stepIndex];
    nextBtn.disabled = !step.canNext();
    nextBtn.style.opacity = nextBtn.disabled ? '0.45' : '1';
  });
  observer.observe(bodyEl, { childList: true, subtree: true });

  syncNav();
})();



