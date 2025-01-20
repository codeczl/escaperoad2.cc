// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getSortedPostsData } from '@/lib/posts'
import { getCategories } from '@/lib/data';

import { ToolsList } from '@/components/ToolsList';
import { ArticleList } from '@/components/ArticleList'

import { Search } from '@/components/Search';
import {getTranslations, getLocale} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}


type categoryType = { 
  name: string; 
  src: string; 
  description: string;
  link: string; 
}


export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const categories = getCategories(locale);
  const allPostsData = getSortedPostsData(locale).slice(0, 6)
  
  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-7xl tracking-tighter">
          {t("h1")}
        </h1>
        <h2 className="text-2xl tracking-tight sm:text-3xl md:text-3xl lg:text-3xl">{t("h2")}</h2>
        <p className="mx-auto max-w-[700px] md:text-xl tracking-tight">
          {t("intro")}
        </p>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("introduction_section.title")}</h2>
        <p>{t("introduction_section.description")}</p>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("gameplay_section.title")}</h2>
        <p>{t("gameplay_section.description")}</p>
      </section>

      {/* Tips Section */}
      <section id="tips" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("tips_section.title")}</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>{t("tips_section.tips.driving")}</li>
          <li>{t("tips_section.tips.environment")}</li>
          <li>{t("tips_section.tips.powerups")}</li>
          <li>{t("tips_section.tips.skills")}</li>
        </ul>
      </section>

      {/* Media Section */}
      <section id="media" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("media_section.title")}</h2>
        <p>{t("media_section.description")}</p>
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/your_video_id" 
          className="mx-auto"
          allowFullScreen
        />
      </section>

      {/* News Section */}
      <section id="news" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("news_section.title")}</h2>
        <p>{t("news_section.description")}</p>
      </section>

      <div className='border-t'></div>
      
      {/* Keep existing ToolsList and ArticleList */}
      {categories.map((category: categoryType, index: React.Key | null | undefined) => (
        <ToolsList key={index} category={category} locale={locale} />
      ))}
      <div className='border-t'></div>
      <Suspense fallback={<div>Loading editor...</div>}>
        <ArticleList articles={allPostsData} />
      </Suspense>
    </div>
  )
}