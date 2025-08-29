package com.example.lunchroulette.service.impl;

import com.example.lunchroulette.mapper.VideoMapper;
import com.example.lunchroulette.model.Video;
import com.example.lunchroulette.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoMapper videoMapper;

    @Override
    public List<Video> getVideos(String query, String category, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        return videoMapper.findVideosByQueryAndCategory(query, category, offset, pageSize);
    }

    @Override
    public int getTotalVideos(String query, String category) {
        return videoMapper.countVideosByQueryAndCategory(query, category);
    }

    @Override
    public Video getVideoById(Long id) {
        return videoMapper.selectById(id);
    }

    @Override
    public Video createVideo(Video video) {
        video.setCreateTime(new Date());
        video.setUpdateTime(new Date());
        videoMapper.insert(video);
        return video;
    }

    @Override
    public Video updateVideo(Long id, Video video) {
        video.setId(id);
        video.setUpdateTime(new Date());
        videoMapper.updateById(video);
        return video;
    }

    @Override
    public void deleteVideo(Long id) {
        videoMapper.deleteById(id);
    }
}