// Sistema de carregamento dinâmico de imóveis
class PropertiesManager {
  constructor() {
    this.defaultProperties = [
      {
        id: 1,
        image: "assets/images/property-01.jpg",
        category: "Luxury Villa",
        price: "$2.264.000",
        title: "18 Old Street Miami, OR 97219",
        bedrooms: 8,
        bathrooms: 8,
        area: "545m2",
        floor: "3",
        parking: "6 spots",
        type: "adv",
        status: "disponivel",
        description: "Villa de luxo com área ampla, acabamento premium e localização privilegiada em Miami.",
      },
      {
        id: 2,
        image: "assets/images/property-02.jpg",
        category: "Luxury Villa",
        price: "$1.180.000",
        title: "54 New Street Florida, OR 27001",
        bedrooms: 6,
        bathrooms: 5,
        area: "450m2",
        floor: "3",
        parking: "8 spots",
        type: "str",
        status: "disponivel",
        description: "Residência elegante em região nobre da Flórida, perfeita para família grande.",
      },
      {
        id: 3,
        image: "assets/images/property-03.jpg",
        category: "Luxury Villa",
        price: "$1.460.000",
        title: "26 Mid Street Portland, OR 38540",
        bedrooms: 5,
        bathrooms: 4,
        area: "225m2",
        floor: "3",
        parking: "10 spots",
        type: "adv rac",
        status: "disponivel",
        description: "Imóvel moderno com integração de ambientes e excelente incidência de luz natural.",
      },
      {
        id: 4,
        image: "assets/images/property-04.jpg",
        category: "Apartment",
        price: "$584.500",
        title: "12 Hope Street Portland, OR 12650",
        bedrooms: 4,
        bathrooms: 3,
        area: "125m2",
        floor: "25th",
        parking: "2 cars",
        type: "str",
        status: "disponivel",
        description: "Apartamento com vista panorâmica da cidade e infraestrutura completa de lazer.",
      },
      {
        id: 5,
        image: "assets/images/property-05.jpg",
        category: "Penthouse",
        price: "$925.600",
        title: "34 Hope Street Portland, OR 42680",
        bedrooms: 4,
        bathrooms: 4,
        area: "180m2",
        floor: "38th",
        parking: "2 cars",
        type: "rac str",
        status: "disponivel",
        description: "Cobertura sofisticada com terraço exclusivo e espaços amplos para receber convidados.",
      },
      {
        id: 6,
        image: "assets/images/property-06.jpg",
        category: "Modern Condo",
        price: "$450.000",
        title: "22 Hope Street Portland, OR 16540",
        bedrooms: 3,
        bathrooms: 2,
        area: "165m2",
        floor: "26th",
        parking: "3 cars",
        type: "rac adv",
        status: "disponivel",
        description: "Condomínio moderno com áreas verdes e ótima distribuição interna dos cômodos.",
      },
      {
        id: 7,
        image: "assets/images/property-03.jpg",
        category: "Luxury Villa",
        price: "$980.000",
        title: "14 Mid Street Miami, OR 36450",
        bedrooms: 8,
        bathrooms: 8,
        area: "550m2",
        floor: "3",
        parking: "12 spots",
        type: "rac str",
        status: "disponivel",
        description: "Villa de alto padrão com projeto arquitetônico diferenciado e vagas amplas.",
      },
      {
        id: 8,
        image: "assets/images/property-02.jpg",
        category: "Luxury Villa",
        price: "$1.520.000",
        title: "26 Old Street Miami, OR 12870",
        bedrooms: 12,
        bathrooms: 15,
        area: "380m2",
        floor: "3",
        parking: "14 spots",
        type: "rac adv",
        status: "disponivel",
        description: "Imóvel ideal para quem busca conforto e sofisticação em bairro nobre de Miami.",
      },
      {
        id: 9,
        image: "assets/images/property-01.jpg",
        category: "Luxury Villa",
        price: "$3.145.000",
        title: "34 New Street Miami, OR 24650",
        bedrooms: 10,
        bathrooms: 12,
        area: "860m2",
        floor: "3",
        parking: "10 spots",
        type: "rac adv",
        status: "disponivel",
        description: "Mansão luxuosa com grande área construída, perfeita para eventos e receber convidados.",
      },
    ]
  }

  // Obtém todos os imóveis (do localStorage ou padrão)
  getAllProperties() {
    const stored = localStorage.getItem("properties")
    if (stored) {
      try {
        // Garante que todo imóvel tenha um status padrão e descrição opcional
        const parsed = JSON.parse(stored)
        return parsed.map(p => ({
          status: "disponivel",
          description: "",
          ...p,
          status: p.status || "disponivel",
          description: p.description || "",
        }))
      } catch (e) {
        return this.defaultProperties
      }
    }
    return this.defaultProperties
  }

  // Inicializa o localStorage com os imóveis padrão
  initializeProperties() {
    if (!localStorage.getItem("properties")) {
      localStorage.setItem("properties", JSON.stringify(this.defaultProperties))
    }
  }

  // Renderiza os imóveis na página
  renderProperties(containerId) {
    const container = document.querySelector(containerId)
    if (!container) return

    const properties = this.getAllProperties()

    container.innerHTML = properties
      .map(
        (prop) => `
      <div class="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 ${prop.type}">
        <div class="item">
          <a href="property-details.html" onclick="verDetalhesImovel(${prop.id}); return false;"><img src="${prop.image}" alt="${prop.title}"></a>
          <span class="category">${prop.category}</span>
          <h6>${prop.price}</h6>
          <h4><a href="property-details.html" onclick="verDetalhesImovel(${prop.id}); return false;">${prop.title}</a></h4>
          <ul>
            <li>Quartos: <span>${prop.bedrooms}</span></li>
            <li>Banheiros: <span>${prop.bathrooms}</span></li>
            <li>Área: <span>${prop.area}</span></li>
            <li>Andar: <span>${prop.floor}</span></li>
            <li>Vagas: <span>${prop.parking}</span></li>
          </ul>
          
<div class="main-button">
  <a href="#" onclick="irParaVisita('${prop.title}', '${prop.price}', '${prop.image}')">Agendar visita</a>
</div>
        </div>
      </div>
    `,
      )
      .join("")

    // Reinicializar Isotope após renderizar
    if (window.jQuery && window.jQuery(".properties-box").length > 0) {
      setTimeout(() => {
        window.jQuery(".properties-box").isotope("reloadItems").isotope()
      }, 100)
    }
  }

  // Ouve mudanças no localStorage (sincronização entre abas)
  watchForChanges(containerId) {
    window.addEventListener("storage", () => {
      this.renderProperties(containerId)
    })
  }

  // Inicializa os filtros de propriedades
  initializeFilters() {
    if (!window.jQuery || !window.jQuery(".properties-box").length) return

    // Inicializar Isotope na .properties-box
    const $propertiesBox = window.jQuery(".properties-box")
    $propertiesBox.isotope({
      itemSelector: ".properties-items",
      layoutMode: "fitRows"
    })

    // Adicionar event listeners aos filtros
    const filters = document.querySelectorAll(".properties-filter a")
    filters.forEach(filter => {
      filter.addEventListener("click", (e) => {
        e.preventDefault()

        // Remover classe ativa de todos os filtros
        document.querySelectorAll(".properties-filter a").forEach(f => f.classList.remove("is_active"))

        // Adicionar classe ativa ao filtro clicado
        filter.classList.add("is_active")

        // Obter o valor do filtro
        const filterValue = filter.getAttribute("data-filter")

        // Aplicar filtro no Isotope
        $propertiesBox.isotope({ filter: filterValue })
      })
    })
  }
}

// Inicializar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const manager = new PropertiesManager()
  manager.initializeProperties()
  manager.renderProperties(".properties-box")
  manager.initializeFilters()
  manager.watchForChanges(".properties-box")
})

// Função global para abrir a página de detalhes de um imóvel específico
function verDetalhesImovel(id) {
  localStorage.setItem("selected_property_id", String(id))
  window.location.href = "property-details.html"
}

// Função para salvar os dados e redirecionar
function irParaVisita(titulo, preco, imagem) {
  // 1. Verifica se está logado (Opcional, mas recomendado)
  const logado = localStorage.getItem('usuarioLogado');
  if(!logado) {
    alert("Por favor, faça login para agendar.");
    window.location.href = "login.html";
    return;
  }

  // 2. Salva o imóvel escolhido
  const dadosImovel = {
    titulo: titulo,
    preco: preco,
    imagem: imagem
  };
  localStorage.setItem('imovel_visita', JSON.stringify(dadosImovel));

  // 3. Redireciona para a nova página
  window.location.href = "visita.html";
}
