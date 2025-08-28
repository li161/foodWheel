// src/pages/FoodVideo.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";

// 模拟的B站视频数据API
const fetchBilibiliVideos = function(query, category, page) {
  query = query || '';
  category = category || '';
  page = page || 1;
  
  // 模拟网络延迟
  return new Promise(function(resolve) {
    setTimeout(function() {
      // 模拟视频数据
      const mockVideos = [
        { id: 1, title: '【美食制作】超详细家常红烧肉教程，肥而不腻', bvid: 'BV1tS4y167Z1', category: '家常菜', duration: '12:45', views: '234.5万', likes: '12.3万', cover: 'https://picsum.photos/id/292/300/180' },
        { id: 2, title: '【川菜】麻婆豆腐的正宗做法，麻辣鲜香', bvid: 'BV1Jp4y1i7Nv', category: '川菜', duration: '08:20', views: '156.8万', likes: '8.9万', cover: 'https://picsum.photos/id/1080/300/180' },
        { id: 3, title: '【甜点】不用烤箱的简单甜点，5分钟搞定', bvid: 'BV1bQ4y1v7yE', category: '甜点', duration: '05:35', views: '98.2万', likes: '6.7万', cover: 'https://picsum.photos/id/291/300/180' },
        { id: 4, title: '【粤菜】白切鸡的完美做法，皮滑肉嫩', bvid: 'BV1eV411h7Yp', category: '粤菜', duration: '10:15', views: '112.3万', likes: '7.2万', cover: 'https://picsum.photos/id/488/300/180' },
        { id: 5, title: '【烘焙】新手也能做的戚风蛋糕，零失败', bvid: 'BV1cK4y1N7qz', category: '甜点', duration: '15:20', views: '345.6万', likes: '18.9万', cover: 'https://picsum.photos/id/312/300/180' },
        { id: 6, title: '【家常菜】番茄炒蛋，最普通却最考验功底', bvid: 'BV1Nz4y1r7rR', category: '家常菜', duration: '07:45', views: '421.8万', likes: '21.5万', cover: 'https://picsum.photos/id/493/300/180' },
        { id: 7, title: '【川菜】水煮鱼秘方公开，香辣过瘾', bvid: 'BV1hT4y1w7Gd', category: '川菜', duration: '14:30', views: '187.9万', likes: '10.2万', cover: 'https://picsum.photos/id/429/300/180' },
        { id: 8, title: '【西餐】简单易学的意大利面做法', bvid: 'BV1ZK411V7fS', category: '西餐', duration: '09:10', views: '134.2万', likes: '7.8万', cover: 'https://picsum.photos/id/513/300/180' },
      ];
      
      // 模拟筛选逻辑
      let filteredVideos = JSON.parse(JSON.stringify(mockVideos));
      
      if (query) {
        filteredVideos = filteredVideos.filter(function(video) {
          return video.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
      }
      
      if (category && category !== 'all') {
        filteredVideos = filteredVideos.filter(function(video) {
          return video.category === category;
        });
      }
      
      // 模拟分页
      const pageSize = 4;
      const startIndex = (page - 1) * pageSize;
      const paginatedVideos = filteredVideos.slice(startIndex, startIndex + pageSize);
      
      resolve({
        videos: paginatedVideos,
        total: filteredVideos.length,
        page: page,
        totalPages: Math.ceil(filteredVideos.length / pageSize)
      });
    }, 800);
  });
};

function FoodVideo() {
  // 状态管理
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // 视频分类列表
  const categories = ['all', '家常菜', '川菜', '甜点', '粤菜', '西餐'];
  
  // 视频播放器引用
  const videoPlayerRef = useRef(null);
  
  // 加载视频列表的函数，使用useCallback优化
  const loadVideos = useCallback(function(page) {
    page = page || 1;
    setLoading(true);
    setError('');
    
    fetchBilibiliVideos(searchQuery, selectedCategory, page).then(function(result) {
      setVideos(result.videos);
      setTotalPages(result.totalPages);
      setCurrentPage(result.page);
      
      // 如果是第一页且没有选中的视频，则选中第一个视频
      if (result.page === 1 && result.videos.length > 0 && !selectedVideo) {
        setSelectedVideo(result.videos[0]);
      }
    }).catch(function(err) {
      setError('加载视频失败，请稍后再试');
      console.error('Failed to load videos:', err);
    }).finally(function() {
      setLoading(false);
    });
  }, [searchQuery, selectedCategory, selectedVideo]);
  
  // 处理视频选择
  function handleVideoSelect(video) {
    setSelectedVideo(video);
    
    // 当视频改变时，滚动到视频播放区
    if (videoPlayerRef.current) {
      videoPlayerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // 处理搜索提交
  function handleSearchSubmit(e) {
    e.preventDefault();
    setCurrentPage(1);
    loadVideos(1);
  }
  
  // 处理分类改变
  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setCurrentPage(1);
    loadVideos(1);
  }
  
  // 处理分页
  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      loadVideos(newPage);
    }
  }
  
  // 初始加载和依赖变化时重新加载
  useEffect(function() {
    loadVideos(currentPage);
  }, [loadVideos, currentPage]);
  
  // 生成分页按钮
  function renderPagination() {
    const pageButtons = [];
    
    // 总是显示第一页和最后一页
    if (currentPage > 2) {
      pageButtons.push(
        React.createElement('button', {
          key: 1,
          onClick: function() { handlePageChange(1); }
        }, '1')
      );
      if (currentPage > 3) {
        pageButtons.push(React.createElement('span', { key: 'ellipsis1' }, '...'));
      }
    }
    
    // 显示当前页附近的页码
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pageButtons.push(
        React.createElement('button', {
          key: i,
          onClick: function() { handlePageChange(i); },
          className: i === currentPage ? 'active' : ''
        }, i)
      );
    }
    
    // 显示省略号和最后一页
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pageButtons.push(React.createElement('span', { key: 'ellipsis2' }, '...'));
      }
      pageButtons.push(
        React.createElement('button', {
          key: totalPages,
          onClick: function() { handlePageChange(totalPages); }
        }, totalPages)
      );
    }
    
    return React.createElement(
      'div',
      { className: 'pagination' },
      React.createElement('button', {
        onClick: function() { handlePageChange(currentPage - 1); },
        disabled: currentPage === 1
      }, '上一页'),
      pageButtons,
      React.createElement('button', {
        onClick: function() { handlePageChange(currentPage + 1); },
        disabled: currentPage === totalPages
      }, '下一页')
    );
  }
  
  return (
    React.createElement(
      'div',
      { className: 'food-video-container', style: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }},
      React.createElement('h1', { style: { color: '#333', marginBottom: '30px' } }, '美食视频'),
      
      // 搜索和筛选区域
      React.createElement(
        'div',
        { className: 'search-filter-section', style: {
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }},
        // 搜索框
        React.createElement(
          'form',
          { onSubmit: handleSearchSubmit, style: { flex: 1, minWidth: '300px' }},
          React.createElement(
            'div',
            { style: { display: 'flex', gap: '10px' }},
            React.createElement('input', {
              type: 'text',
              placeholder: '搜索美食视频...',
              value: searchQuery,
              onChange: function(e) { setSearchQuery(e.target.value); },
              style: {
                flex: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }
            }),
            React.createElement('button', {
              type: 'submit',
              style: {
                padding: '10px 20px',
                backgroundColor: '#ff5722',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              },
              disabled: loading
            }, loading ? '搜索中...' : '搜索')
          )
        ),
        
        // 分类筛选
        React.createElement(
          'div',
          { className: 'category-filter', style: { display: 'flex', gap: '10px', alignItems: 'center' }},
          React.createElement('span', { style: { fontWeight: 'bold' } }, '分类:'),
          React.createElement(
            'div',
            { style: { display: 'flex', gap: '5px', flexWrap: 'wrap' }},
            categories.map(function(category) {
              return React.createElement(
                'button',
                {
                  key: category,
                  onClick: function() { handleCategoryChange(category); },
                  style: {
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    backgroundColor: selectedCategory === category ? '#ff5722' : 'white',
                    color: selectedCategory === category ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }
                },
                category === 'all' ? '全部' : category
              );
            })
          )
        )
      ),
      
      // 错误提示
      error ? (
        React.createElement(
          'div',
          { className: 'error-message', style: {
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #ef5350'
          }},
          error
        )
      ) : null,
      
      React.createElement(
        'div',
        { className: 'main-content', style: { display: 'flex', gap: '30px', flexWrap: 'wrap' }},
        // 视频播放区
        React.createElement(
          'div',
          { className: 'video-player-section', style: { flex: 1, minWidth: '300px' }, ref: videoPlayerRef },
          React.createElement(
            'div',
            { className: 'video-player-container', style: {
              backgroundColor: '#000',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '16/9'
            }},
            selectedVideo ? (
              React.createElement('iframe', {
                src: '//player.bilibili.com/player.html?isOutside=true&bvid=' + selectedVideo.bvid + '&p=1',
                width: '100%',
                height: '100%',
                scrolling: 'no',
                border: '0',
                frameBorder: 'no',
                framespacing: '0',
                allowFullScreen: 'true',
                title: selectedVideo.title
              })
            ) : (
              React.createElement(
                'div',
                { style: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  color: '#999',
                  fontSize: '18px'
                }},
                '请选择一个视频开始观看'
              )
            )
          ),
          
          selectedVideo ? (
            React.createElement(
              'div',
              { className: 'video-info', style: { marginTop: '20px' }},
              React.createElement('h2', { style: { color: '#333', marginBottom: '10px' } }, selectedVideo.title),
              React.createElement(
                'div',
                { className: 'video-stats', style: {
                  display: 'flex',
                  gap: '20px',
                  color: '#666',
                  fontSize: '14px'
                }},
                React.createElement('span', null, '时长: ' + selectedVideo.duration),
                React.createElement('span', null, '播放: ' + selectedVideo.views),
                React.createElement('span', null, '点赞: ' + selectedVideo.likes),
                React.createElement('span', null, '分类: ' + selectedVideo.category)
              )
            )
          ) : null
        ),
        
        // 视频列表
        React.createElement(
          'div',
          { className: 'video-list-section', style: { flex: 1, minWidth: '300px' }},
          React.createElement('h2', { style: { color: '#333', marginBottom: '20px' } }, '视频列表'),
          
          loading ? (
            React.createElement(
              'div',
              { className: 'loading', style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                fontSize: '18px',
                color: '#666'
              }},
              '加载中...'
            )
          ) : videos.length > 0 ? (
            React.createElement(
              'div',
              { className: 'video-list' },
              videos.map(function(video) {
                return React.createElement(
                  'div',
                  {
                    key: video.id,
                    className: 'video-item',
                    onClick: function() { handleVideoSelect(video); },
                    style: {
                      display: 'flex',
                      gap: '15px',
                      padding: '15px',
                      marginBottom: '10px',
                      borderRadius: '8px',
                      backgroundColor: selectedVideo && selectedVideo.id === video.id ? '#f5f5f5' : 'white',
                      border: selectedVideo && selectedVideo.id === video.id ? '2px solid #ff5722' : '1px solid #ddd',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    },
                    onMouseEnter: function(e) {
                      if (!(selectedVideo && selectedVideo.id === video.id)) {
                        e.currentTarget.style.backgroundColor = '#fafafa';
                      }
                    },
                    onMouseLeave: function(e) {
                      if (!(selectedVideo && selectedVideo.id === video.id)) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }
                  },
                  React.createElement(
                    'div',
                    { className: 'video-thumbnail', style: { flexShrink: 0 }},
                    React.createElement('img', {
                      src: video.cover,
                      alt: video.title,
                      style: {
                        width: '120px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }
                    }),
                    React.createElement(
                      'div',
                      { className: 'video-duration', style: {
                        position: 'relative',
                        bottom: '22px',
                        right: '5px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '2px 5px',
                        borderRadius: '3px',
                        fontSize: '12px',
                        float: 'right'
                      }},
                      video.duration
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'video-details', style: { flex: 1, minWidth: 0 }},
                    React.createElement(
                      'h3',
                      { style: {
                        color: '#333',
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }},
                      video.title
                    ),
                    React.createElement(
                      'div',
                      { className: 'video-meta', style: {
                        display: 'flex',
                        gap: '10px',
                        fontSize: '12px',
                        color: '#999'
                      }},
                      React.createElement('span', null, video.category),
                      React.createElement('span', null, video.views),
                      React.createElement('span', null, video.likes)
                    )
                  )
                );
              })
            )
          ) : (
            React.createElement(
              'div',
              { className: 'no-videos', style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                fontSize: '18px',
                color: '#666',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }},
              '没有找到相关视频'
            )
          ),
          
          // 分页
          videos.length > 0 ? (
            React.createElement(
              'div',
              { style: { marginTop: '30px' }},
              renderPagination()
            )
          ) : null
        )
      ),
      
      // 自定义样式
      React.createElement(
        'style',
        { jsx: true, global: true },
        '.pagination {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          gap: 8px;\n          margin-top: 20px;\n        }\n        \n        .pagination button {\n          padding: 8px 12px;\n          border: 1px solid #ddd;\n          background-color: white;\n          border-radius: 4px;\n          cursor: pointer;\n          transition: all 0.3s ease;\n        }\n        \n        .pagination button:hover:not(:disabled) {\n          background-color: #f5f5f5;\n        }\n        \n        .pagination button.active {\n          background-color: #ff5722;\n          color: white;\n          border-color: #ff5722;\n        }\n        \n        .pagination button:disabled {\n          opacity: 0.5;\n          cursor: not-allowed;\n        }\n        \n        .pagination span {\n          color: #666;\n          padding: 8px 4px;\n        }'
      )
    )
  );
}

export default FoodVideo;
