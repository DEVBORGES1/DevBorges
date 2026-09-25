import { mount } from '../../mount'
import ProjectPage from '../ProjectPage.jsx'

// Mesmo script para todas as páginas de projeto: o projeto vem de <html data-project> e o idioma de <html lang>
const { lang, dataset } = document.documentElement

mount(<ProjectPage id={dataset.project} locale={lang === 'en' ? 'en' : 'pt'} />)
