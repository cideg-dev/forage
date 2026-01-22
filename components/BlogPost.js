// components/BlogPost.js
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Calendar, User, Clock } from 'lucide-react';

const BlogPost = ({ post }) => {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative">
        <LazyLoadImage 
          src={post.image} 
          alt={post.title} 
          effect="blur"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
          <Calendar size={16} className="mr-1" />
          <span className="mr-4">{new Date(post.date).toLocaleDateString('fr-FR')}</span>
          
          <User size={16} className="mr-1" />
          <span className="mr-4">{post.author}</span>
          
          <Clock size={16} className="mr-1" />
          <span>{post.readTime}</span>
        </div>
        
        <button className="text-cyan-600 dark:text-cyan-400 font-medium hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors">
          Lire l'article →
        </button>
      </div>
    </article>
  );
};

export default BlogPost;