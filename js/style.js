document.addEventListener("DOMContentLoaded", () => {
  /* =========================
   * 1) FAQ（1個だけ開く + 1:1高さ）
   * ========================= */
  const items = Array.from(document.querySelectorAll(".qusetion-wrap__body__list__item"));

  if (items.length) {
    // 初期化：全て閉じる
    items.forEach(item => {
      item.classList.remove("is-open");
      const p = item.querySelector("p");
      if (p) p.style.maxHeight = "0px";
    });

    const closeItem = (item) => {
      item.classList.remove("is-open");
      const p = item.querySelector("p");
      if (p) p.style.maxHeight = "0px";
    };

    const openItem = (item) => {
      const p = item.querySelector("p");
      if (!p) return;

      item.classList.add("is-open");
      p.style.maxHeight = "0px";

      // 次フレームで実寸反映（1:1）
      requestAnimationFrame(() => {
        p.style.maxHeight = p.scrollHeight + "px";
      });
    };

    items.forEach(item => {
      const head = item.querySelector(".qusetion-wrap__body__list__item__head");
      if (!head) return;

      head.addEventListener("click", (e) => {
        const current = e.currentTarget.closest(".qusetion-wrap__body__list__item");
        if (!current) return;

        const wasOpen = current.classList.contains("is-open");

        // まず全部閉じる（＝1個だけ開く）
        items.forEach(closeItem);

        // すでに開いてたなら閉じたまま（トグルで閉じる）
        if (wasOpen) return;

        // 開く
        openItem(current);
      });
    });

    // リサイズ時：開いてる項目だけ高さを再計算
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        items.forEach(item => {
          if (!item.classList.contains("is-open")) return;
          const p = item.querySelector("p");
          if (p) p.style.maxHeight = p.scrollHeight + "px";
        });
      }, 100);
    });
  }

  /* =========================
   * 2) Section フェードアップ（.fade-up のみ）
   * ========================= */
  const targets = document.querySelectorAll(".fade-up");
  if (targets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target); // 1回だけ
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: "0px 0px -20% 0px"
    });

    targets.forEach(el => io.observe(el));
  }
});
