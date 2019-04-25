    import reLiftHTML from '//unpkg.com/relift-html';
  
    
    reLiftHTML({
      el: '#sideMenu',
      data: {
        menu: []
      },
      created() {
        const el = document.querySelector('#content-side-affix')
        if (el) {
          const scroll = () => {
            const scrollTop = window.pageYOffset;
            if( scrollTop > 100 ){
              el.style.top=`${top}px`;
              el.style.position='fixed';
            } else {
              el.style.position='relative';
              el.style.top='0px';
            }
          };
    
          const top = el.getAttribute('data-affix-top') || 100;
          [...el.querySelectorAll('[data-affix-link]')].map(e => {
            e.addEventListener('click', (ev) => {
              ev.preventDefault();
              document.querySelector(e.getAttribute('data-affix-link')).scrollIntoView({behavior: 'smooth'});
              setTimeout(() => {
                scroll();
              }, 300)
            })
          })
          window.onscroll = scroll;
        }
    
    
        const sections = [];
        for (const s of document.querySelectorAll('.guides section')) {
          const subsections = [];
          const h2 = s.querySelector('h2');
          const slug = slugify(h2.innerText);
          h2.setAttribute('id', `#${slug}`)
          sections.push({
            title: h2.innerText,
            url: slug ,
            subsections: [...s.querySelectorAll('h3')].map(h3 => {
              const slug = slugify(h3.innerText)
              h3.setAttribute('id', `#${slug}`)
              return {
                title: h3.innerText,
                url: slug
              }
            })
          })
        }
      },
      slugify: (s) => s.toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
      .replace(/^-+|-+$/g, ''), // remove leading, trailing -
      
    });




    console.log(sections)
    

