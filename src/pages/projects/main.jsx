import { mount } from '../../mount'
import ProjectsPage from '../ProjectsPage.jsx'

// Mesmo script para /projects/ e /en/projects/: o idioma vem do <html lang>
mount(<ProjectsPage locale={document.documentElement.lang === 'en' ? 'en' : 'pt'} />)
