import React, { useState, useMemo, useEffect } from "react";
import Header from "components/Header";
import playersJSON from "resources/data/players.json";
import { useDrag, useDrop } from "react-dnd";
import ExternalInfo from "components/ExternalInfo";
import "./team-selection-styles.css"; // Import custom styles

const TeamSelection = () => {
  const [players, setPlayers] = useState(() => playersJSON);
  const [team, setTeam] = useState([]);
  // Track recently moved cards by their IDs
  const [recentlyMoved, setRecentlyMoved] = useState([]);
  
  // Sort players alphabetically by name
  const sortedPlayers = useMemo(() => 
    [...players].sort((a, b) => a.name.localeCompare(b.name)), 
    [players]
  );
  
  // Sort team alphabetically by name
  const sortedTeam = useMemo(() => 
    [...team].sort((a, b) => a.name.localeCompare(b.name)), 
    [team]
  );
  
  // Clear the recently moved cards after a timeout
  useEffect(() => {
    if (recentlyMoved.length > 0) {
      const timer = setTimeout(() => {
        setRecentlyMoved([]);
      }, 1000); // 1 second animation
      return () => clearTimeout(timer);
    }
  }, [recentlyMoved]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const movePlayer = (item) => {
    console.log(item);
    if (item && item.type === "player") {
      // Accepting player into the team
      const movedPlayer = players[item.index];
      setTeam((_team) => [..._team, movedPlayer]);
      setPlayers((_players) => _players.filter((_, idx) => idx !== item.index));
      // Mark this player as recently moved
      setRecentlyMoved([movedPlayer.id]);
    } else {
      // Removing a player from team
      const movedPlayer = team[item.index];
      setPlayers((_players) => [..._players, movedPlayer]);
      setTeam((_team) => _team.filter((_, idx) => idx !== item.index));
      // Mark this player as recently moved
      setRecentlyMoved([movedPlayer.id]);
    }
  };

  const dragHoverTeamBG = isOver ? "team-highlight" : "bg-light";
  const dragHoverPlayerBG = isPlayerOver ? "drag-highlight" : "bg-light";

  return (
    <>
      <Header title="Team Selection (Drag And Drop)" />

      <ExternalInfo page="dnd" />

      <div className="row">
        <div className="col text-center">
          <h2>Team Selection Component</h2>
          <p>Demonstrating react-dnd by implementing team selection UI</p>
          <div className="row justify-content-md-center">
            <div className={`col-5 border m-2 ${dragHoverPlayerBG}`}>
              <div className={`bg-info row text-white ${isPlayerOver ? 'pulse-header' : ''}`}>
                <div className="col font-weight-bold">Available Players ({sortedPlayers.length})</div>
              </div>
              <ul className="list-group py-2 h-100" ref={removeFromTeamRef}>
                {sortedPlayers.map((player, idx) => {
                  // Find the original index in the unsorted players array
                  const originalIndex = players.findIndex(p => p.id === player.id);
                  const isRecent = recentlyMoved.includes(player.id);
                  return (
                    <Player
                      {...player}
                      key={player.id}
                      index={originalIndex}
                      playerType="player"
                      onDropPlayer={movePlayer}
                      isRecent={isRecent}
                    />
                  );
                })}
              </ul>
            </div>
            <div className={`col-5 border m-2 ${dragHoverTeamBG}`}>
              <div className={`bg-success row text-white ${isOver ? 'pulse-header' : ''}`}>
                <div className="col font-weight-bold">THE A-TEAM ({sortedTeam.length})</div>
              </div>
              <ul className="list-group py-2 h-100" ref={addToTeamRef}>
                {sortedTeam.map((player, idx) => {
                  // Find the original index in the unsorted team array
                  const originalIndex = team.findIndex(p => p.id === player.id);
                  const isRecent = recentlyMoved.includes(player.id);
                  return (
                    <Player
                      {...player}
                      key={player.id}
                      index={originalIndex}
                      playerType="team"
                      onDropPlayer={movePlayer}
                      isRecent={isRecent}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Player = ({
  name,
  age,
  nationality,
  photo,
  index,
  playerType,
  onDropPlayer,
  isRecent = false,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: playerType,
      index,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li className={`list-group-item my-1 p-2 ${isRecent ? 'card-moved' : ''}`} ref={dragRef}>
      <div className={`card border-0 ${isRecent ? 'card-moved' : ''}`}>
        <div className={`row no-gutters ${isRecent ? 'card-moved' : ''}`}>
          <div className="col-md-1">
            <img
              alt=''
              src={photo}
              className="img-thumbnail border-secondary rounded-circle"
            />
          </div>
          <div className={`col-md-9 ${isRecent ? 'card-moved' : ''}`}>
            <div className={`card-body py-1 px-2 text-left `}>
              <h5 className="card-title d-inline">{name}</h5>
              <p className="card-text d-inline">, {nationality}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default TeamSelection;
