package com.tournament.tournament_system.dto;

import lombok.Data;
import java.util.List;

@Data
public class TeamProfileResponse {
    private Integer teamId;
    private String name;
    private String logo;
    private String region;
    private String coachUsername;
    private String coachImage;
    private List<PlayerInfo> players;

    @Data
    public static class PlayerInfo {
        private String username;
        private String image;
    }
}

