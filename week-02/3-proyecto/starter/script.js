/**
 * ============================================
 * GESTOR DE LUGARES TURÍSTICOS - COLOMBIA 🇨🇴
 * Categorías por regiones naturales
 * ============================================
 */

// ============================================
// ESTADO GLOBAL
// ============================================

let items = [];
let editingItemId = null;

// ============================================
// CATEGORÍAS - REGIONES DE COLOMBIA
// ============================================

const CATEGORIES = {
  caribe: { name: 'Caribe', emoji: '🌊' },
  andina: { name: 'Andina', emoji: '⛰️' },
  pacifica: { name: 'Pacífica', emoji: '🌴' },
  orinoquia: { name: 'Orinoquía', emoji: '🐎' },
  amazonia: { name: 'Amazonía', emoji: '🌳' },
  insular: { name: 'Insular', emoji: '🏝️' },
};

const PRIORITIES = {
  high: { name: 'Alta', color: '#ef4444' },
  medium: { name: 'Media', color: '#f59e0b' },
  low: { name: 'Baja', color: '#22c55e' },
};

// ============================================
// PERSISTENCIA
// ============================================

const loadItems = () =>
  JSON.parse(localStorage.getItem('colombiaTouristPlaces') ?? '[]');

const saveItems = itemsToSave =>
  localStorage.setItem('colombiaTouristPlaces', JSON.stringify(itemsToSave));

// ============================================
// CRUD - CREAR
// ============================================

const createItem = (itemData = {}) => {
  const newItem = {
    id: Date.now(),
    name: itemData.name ?? '',
    description: itemData.description ?? '',
    location: itemData.location ?? '',
    category: itemData.category ?? 'andina',
    priority: itemData.priority ?? 'medium',
    rating: itemData.rating ?? 0,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    ...itemData
  };

  const newItems = [...items, newItem];
  saveItems(newItems);
  return newItems;
};

// ============================================
// CRUD - ACTUALIZAR
// ============================================

const updateItem = (id, updates) => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(updatedItems);
  return updatedItems;
};

// ============================================
// CRUD - ELIMINAR
// ============================================

const deleteItem = id => {
  const filteredItems = items.filter(item => item.id !== id);
  saveItems(filteredItems);
  return filteredItems;
};

// ============================================
// TOGGLE ESTADO
// ============================================

const toggleItemActive = id => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(updatedItems);
  return updatedItems;
};

const clearInactive = () => {
  const activeItems = items.filter(item => item.active);
  saveItems(activeItems);
  return activeItems;
};

// ============================================
// FILTROS
// ============================================

const filterByStatus = (itemsToFilter, status = 'all') => {
  if (status === 'all') return itemsToFilter;
  if (status === 'active') return itemsToFilter.filter(i => i.active);
  if (status === 'inactive') return itemsToFilter.filter(i => !i.active);
  return itemsToFilter;
};

const filterByCategory = (itemsToFilter, category = 'all') =>
  category === 'all'
    ? itemsToFilter
    : itemsToFilter.filter(i => i.category === category);

const filterByPriority = (itemsToFilter, priority = 'all') =>
  priority === 'all'
    ? itemsToFilter
    : itemsToFilter.filter(i => i.priority === priority);

const searchItems = (itemsToFilter, query = '') => {
  if (!query.trim()) return itemsToFilter;

  const searchTerm = query.toLowerCase();

  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.location.toLowerCase().includes(searchTerm)
  );
};

const applyFilters = (itemsToFilter, filters = {}) => {
  const {
    status = 'all',
    category = 'all',
    priority = 'all',
    search = ''
  } = filters;

  return searchItems(
    filterByPriority(
      filterByCategory(
        filterByStatus(itemsToFilter, status),
        category
      ),
      priority
    ),
    search
  );
};

// ============================================
// ESTADÍSTICAS
// ============================================

const getStats = (itemsToAnalyze = []) => {
  const total = itemsToAnalyze.length;
  const active = itemsToAnalyze.filter(i => i.active).length;
  const inactive = total - active;

  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});

  return { total, active, inactive, byCategory, byPriority };
};

// ============================================
// UTILIDADES
// ============================================

const getCategoryEmoji = category =>
  CATEGORIES[category]?.emoji ?? '📍';

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// ============================================
// RENDER ITEM
// ============================================

const renderItem = item => {
  const {
    id,
    name,
    description,
    location,
    category,
    priority,
    rating,
    active,
    createdAt
  } = item;

  return `
    <div class="item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">
      <input type="checkbox" class="item-checkbox" ${active ? 'checked' : ''}>
      <div class="item-content">
        <h3>${getCategoryEmoji(category)} ${name}</h3>
        ${description ? `<p>${description}</p>` : ''}
        <p>📍 ${location}</p>
        <p>⭐ Rating: ${rating}</p>
        <div class="item-meta">
          <span>${PRIORITIES[priority]?.name}</span>
          <span>📅 ${formatDate(createdAt)}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
      </div>
    </div>
  `;
};

// ============================================
// RENDER LISTA
// ============================================

const renderItems = itemsToRender => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    itemList.innerHTML = itemsToRender.map(renderItem).join('');
  }
};

// ============================================
// RENDER ESTADÍSTICAS
// ============================================

const renderStats = stats => {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  const categoryStats = Object.entries(stats.byCategory)
    .map(([cat, count]) =>
      `${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name}: ${count}`
    )
    .join(' | ');

  document.getElementById('stats-details').textContent = categoryStats;
};

// ============================================
// EVENT HANDLERS
// ============================================

const handleFormSubmit = e => {
  e.preventDefault();

  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const location = document.getElementById('item-location').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;
  const rating = document.getElementById('item-rating').value;

  if (!name) {
    alert('El nombre es obligatorio');
    return;
  }

  const itemData = { name, description, location, category, priority, rating };

  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const handleItemToggle = itemId => {
  items = toggleItemActive(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const handleItemEdit = itemId => {
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;

  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-description').value = itemToEdit.description;
  document.getElementById('item-location').value = itemToEdit.location;
  document.getElementById('item-category').value = itemToEdit.category;
  document.getElementById('item-priority').value = itemToEdit.priority;
  document.getElementById('item-rating').value = itemToEdit.rating;

  document.getElementById('form-title').textContent = '✏️ Editar Lugar';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-block';

  editingItemId = itemId;
};

const handleItemDelete = itemId => {
  if (!confirm('¿Eliminar este lugar turístico?')) return;

  items = deleteItem(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const getCurrentFilters = () => ({
  status: document.getElementById('filter-status').value,
  category: document.getElementById('filter-category').value,
  priority: document.getElementById('filter-priority').value,
  search: document.getElementById('search-input').value
});

const applyCurrentFilters = () =>
  applyFilters(items, getCurrentFilters());

const handleFilterChange = () =>
  renderItems(applyCurrentFilters());

const resetForm = () => {
  document.getElementById('item-form').reset();
  document.getElementById('form-title').textContent = '➕ Nuevo Lugar';
  document.getElementById('submit-btn').textContent = 'Crear';
  document.getElementById('cancel-btn').style.display = 'none';
  editingItemId = null;
};

// ============================================
// EVENT LISTENERS
// ============================================

const attachEventListeners = () => {

  document.getElementById('item-form')
    .addEventListener('submit', handleFormSubmit);

  document.getElementById('cancel-btn')
    .addEventListener('click', resetForm);

  document.getElementById('filter-status')
    .addEventListener('change', handleFilterChange);

  document.getElementById('filter-category')
    .addEventListener('change', handleFilterChange);

  document.getElementById('filter-priority')
    .addEventListener('change', handleFilterChange);

  document.getElementById('search-input')
    .addEventListener('input', handleFilterChange);

  document.getElementById('clear-inactive')
    .addEventListener('click', () => {
      if (confirm('¿Eliminar todos los lugares inactivos?')) {
        items = clearInactive();
        renderItems(applyCurrentFilters());
        renderStats(getStats(items));
      }
    });

  document.getElementById('item-list')
    .addEventListener('click', e => {
      const itemElement = e.target.closest('.item');
      if (!itemElement) return;

      const itemId = parseInt(itemElement.dataset.itemId);

      if (e.target.classList.contains('item-checkbox')) {
        handleItemToggle(itemId);
      } else if (e.target.classList.contains('btn-edit')) {
        handleItemEdit(itemId);
      } else if (e.target.classList.contains('btn-delete')) {
        handleItemDelete(itemId);
      }
    });
};

// ============================================
// INICIALIZACIÓN
// ============================================

const init = () => {
  items = loadItems();
  renderItems(items);
  renderStats(getStats(items));
  attachEventListeners();
  console.log('🇨🇴 Gestor de Lugares Turísticos inicializado correctamente');
};

document.addEventListener('DOMContentLoaded', init);