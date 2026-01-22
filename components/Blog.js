// components/Blog.js
import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from 'react-i18next';
import BlogPost from './BlogPost';

// Données simulées pour les articles de blog
const blogPosts = [
  {
    id: 1,
    title: "Techniques Avancées de Forage en Terrain Rocheux",
    excerpt: "Découvrez nos méthodes innovantes pour forer efficacement dans les formations géologiques les plus difficiles.",
    date: "2024-05-15",
    author: "Dr. Jean Dupont",
    category: "Technique",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1532083602183-383a99f43b78?auto=format&fit=crop&w=800"
  },
  {
    id: 2,
    title: "Impact Environnemental des Projets Hydrogéologiques",
    excerpt: "Analyse approfondie de l'impact écologique de nos projets et mesures d'atténuation mises en œuvre.",
    date: "2024-04-22",
    author: "Marie Traoré",
    category: "Environnement",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800"
  },
  {
    id: 3,
    title: "Étude de Cas: Projet d'Approvisionnement en Eau à Kpalimé",
    excerpt: "Retour sur notre projet phare d'approvisionnement en eau potable dans la région de Kpalimé.",
    date: "2024-03-30",
    author: "Ahmed Diallo",
    category: "Projets",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1576618148400-f54297bb1cc7?auto=format&fit=crop&w=800"
  },
  {
    id: 4,
    title: "Innovation dans les Techniques de Recherche Géophysique",
    excerpt: "Présentation de nos dernières avancées en matière de prospection hydrogéologique.",
    date: "2024-02-18",
    author: "Dr. Paul Kouassi",
    category: "Innovation",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=800"
  }
];

const Blog = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les articles selon la catégorie et la recherche
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Extraire les catégories uniques
  const categories = ['all', ...new Set(blogPosts.map(post => post.category.toLowerCase()))];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900" id="blog">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">{t('blog') || 'Blog'}</h2>
          <h3 className="text-3xl font-black dark:text-white">{t('latestNews') || 'Dernières Actualités'}</h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('blogDescription') || 'Restez informé des dernières innovations, projets et tendances dans le domaine du forage et de l\'hydrologie.'}
          </p>
        </ScrollReveal>

        {/* Filtres */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  selectedCategory === category
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {category === 'all' ? t('all') || 'Tous' : category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={t('searchArticles') || 'Rechercher des articles...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>

        {/* Message si aucun article trouvé */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {t('noArticlesFound') || 'Aucun article trouvé'}
            </p>
          </div>
        )}

        {/* Bouton pour charger plus d'articles */}
        {filteredPosts.length > 0 && filteredPosts.length < blogPosts.length && (
          <div className="text-center mt-12">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
              {t('loadMore') || 'Charger plus'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;