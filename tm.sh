tmux new-session -d bash
tmux split-window -v bash
#sends keys to first and second terminals
tmux send -t 0:0.0 "npm run watch" C-m
tmux send -t 0:0.1 "npm start" C-m
tmux -2 attach-session -d
