document.addEventListener('DOMContentLoaded', function () {
  const itemlist = document.querySelector('.contentitems');
  const loadmoreBtn = document.getElementById('loadmoreposts');
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const pagesize = parseInt(itemlist?.dataset.pagesize || '9', 10);

  if (!itemlist || !checkboxes.length) return;

  function hideAllPosts() {
    itemlist.querySelectorAll('li').forEach(li => li.style.display = 'none');
  }

  function loadMorePosts() {
    const visibleItems = itemlist.querySelectorAll('li:not(.hidden)');
    let shown = 0;
    visibleItems.forEach(li => {
      if (shown < pagesize) {
        const img = li.querySelector('img[data-src]');
        if (img && !img.src) img.src = img.dataset.src;
        li.style.display = 'block';
        shown++;
      }
    });
    if (loadmoreBtn) loadmoreBtn.style.display = visibleItems.length > shown ? 'inline-block' : 'none';
  }

  function updatePostFilter() {
    hideAllPosts();
    const selected = Array.from(checkboxes)
                          .filter(cb => cb.checked)
                          .map(cb => cb.value);

    const allItems = itemlist.querySelectorAll('li');
    allItems.forEach(li => li.classList.remove('hidden'));

    if (selected.length) {
      allItems.forEach(li => {
        const hasTag = selected.some(tag => li.classList.contains('tag_' + tag));
        if (!hasTag) li.classList.add('hidden');
      });
    }

    loadMorePosts();
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updatePostFilter));
  if (loadmoreBtn) loadmoreBtn.addEventListener('click', loadMorePosts);

  // init
  updatePostFilter();
});
