package com.example.lunchroulette.service;

import com.example.lunchroulette.model.Video;
import java.util.List;

public interface VideoService {
    List<Video> getVideos(String query, String category, int page, int pageSize);
    int getTotalVideos(String query, String category);
    Video getVideoById(Long id);
    Video createVideo(Video video);
    Video updateVideo(Long id, Video video);
    void deleteVideo(Long id);
}